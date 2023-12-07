import { Injectable } from '@nestjs/common';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { JobOffer, Prisma } from '@prisma/client';
import { RandomPage } from 'src/common/interfaces/random-page.interface';
import { RandomPaginationParamsDto } from 'src/common/dto/random-pagination-params.dto';
import { JobOffersFilterParamsDto } from './dto/job-offers-filter-params.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class JobOffersService {
  constructor(private prismaService: PrismaService) {}

  async create(createJobOfferDto: CreateJobOfferDto): Promise<JobOffer> {
    try {
      return await this.prismaService.jobOffer.create({
        data: createJobOfferDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a job offer with the given \`id\` (${createJobOfferDto.id})`,
            { cause: error },
          );
        }
        if (error.code === 'P2003') {
          let fieldName = error.meta?.field_name as string;
          if (fieldName.includes('careerName')) {
            throw new NotFoundError(
              `There is no career with \`name\` equal to \`${createJobOfferDto.careerName}\``,
            );
          }
          if (fieldName.includes('contractTypeName')) {
            throw new NotFoundError(
              `There is no contract type with \`name\` equal to \`${createJobOfferDto.contractTypeName}\``,
            );
          }
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findPageRandomly(
    { pageNumber, itemsPerPage, randomizationSeed }: RandomPaginationParamsDto,
    filterParams: JobOffersFilterParamsDto,
  ): Promise<RandomPage<JobOffer>> {
    randomizationSeed ??= Math.random();

    try {
      let [_, itemsWithTotalCount] = await this.prismaService.$transaction([
        this.prismaService.$queryRaw`
          SELECT 0
          FROM (
            SELECT setseed(${randomizationSeed})
          ) AS randomization_seed
        `,
        this.prismaService.$queryRaw<(JobOffer & { count: number })[]>`
          WITH filtered_job_offers AS (
            SELECT j.*
            FROM "JobOffer" AS j
              LEFT JOIN "JobOfferTechnicalSkill" AS jots ON j."id" = jots."jobOfferId"
            WHERE
              j."isVisible" = TRUE
              ${
                filterParams.companyName
                  ? Prisma.sql`AND j."companyName" ILIKE '%' || ${filterParams.companyName} || '%'`
                  : Prisma.empty
              }
              ${
                filterParams.careersNames
                  ? Prisma.sql`AND j."careerName" ILIKE ANY (ARRAY[${Prisma.join(
                      filterParams.careersNames,
                    )}])`
                  : Prisma.empty
              }
              ${
                filterParams.positions
                  ? Prisma.sql`AND j."position" ILIKE ANY (ARRAY[${Prisma.join(
                      filterParams.positions,
                    )}])`
                  : Prisma.empty
              }
              ${
                filterParams.contracts
                  ? Prisma.sql`AND j."contractTypeName" ILIKE ANY (ARRAY[${Prisma.join(
                      filterParams.contracts,
                    )}])`
                  : Prisma.empty
              }
            GROUP BY j."id"
            HAVING
              ${
                filterParams.skills
                  ? Prisma.sql`${Prisma.join(
                      filterParams.skills.map(({ categoryName, skillName }) => {
                        return Prisma.sql`bool_or(jots."technicalSkillCategoryName" ILIKE ${categoryName} AND jots."technicalSkillName" ILIKE ${skillName})`;
                      }),
                      ' AND ',
                    )}`
                  : Prisma.empty
              }
          ), filtered_job_offers_count AS (
            SELECT COUNT(*) AS count
            FROM filtered_job_offers
          )
          SELECT *
          FROM filtered_job_offers, filtered_job_offers_count
          ORDER BY random()
          LIMIT ${itemsPerPage}
          OFFSET ${itemsPerPage * (pageNumber - 1)}
        `,
      ]);

      const numberOfItems = Number(itemsWithTotalCount.length ? itemsWithTotalCount[0].count : 0);
      const items = itemsWithTotalCount.map(({ count, ...jobOffer }) => jobOffer);

      return {
        items,
        meta: {
          pageNumber,
          itemsPerPage,
          numberOfItems,
          numberOfPages: Math.ceil(numberOfItems / itemsPerPage),
          randomizationSeed,
        },
      };
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findOne(id: string): Promise<JobOffer | null> {
    try {
      return await this.prismaService.jobOffer.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async update(
    id: string,
    updateJobOfferDto: UpdateJobOfferDto,
  ): Promise<JobOffer> {
    try {
      return await this.prismaService.jobOffer.update({
        where: { id },
        data: updateJobOfferDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no job offer with the given \`id\` (${id})`,
            { cause: error },
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the \`id\` to \`${updateJobOfferDto.id}\`, there already exists a job offer with the same \`id\``,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(id: string): Promise<JobOffer> {
    try {
      return await this.prismaService.jobOffer.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no job offer with the given \`id\` (${id})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  //automatic hiding of jobOffers older than a month
  @Cron(CronExpression.EVERY_12_HOURS)
  async hide() {
    //calculate a month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    //update jobOffer.visibleSince older than a month
    const jobOffers = await this.prismaService.jobOffer.updateMany({
      where: { visibleSince: { lte: oneMonthAgo } },
      data: { isVisible: false },
    });
  }
}
