import { Injectable } from '@nestjs/common';
import { CreateJobOfferDto } from './dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './dto/update-job-offer.dto';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { Prisma } from 'prisma/ualumni/client';
import { RandomPage } from 'src/common/interfaces/random-page.interface';
import { RandomPaginationParamsDto } from 'src/common/dto/random-pagination-params.dto';
import { JobOffersFilterParamsDto } from './dto/job-offers-filter-params.dto';
import { JobOffer } from './job-offer.type';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';

@Injectable()
export class JobOffersService {
  constructor(private ualumniDbService: UalumniDbService) {}

  async create(createJobOfferDto: CreateJobOfferDto): Promise<JobOffer> {
    try {
      return await this.ualumniDbService.jobOffer.create({
        data: createJobOfferDto,
        include: {
          technicalSkills: {
            select: {
              technicalSkillCategoryName: true,
              technicalSkillName: true,
            },
          },
        },
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
          throw new NotFoundError('The given `contractTypeName` or `careerName` does not exist');
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
      let [_, idsWithCount] = await this.ualumniDbService.$transaction([
        this.ualumniDbService.$queryRaw`
          SELECT 0
          FROM (
            SELECT setseed(${randomizationSeed})
          ) AS randomization_seed
        `,
        this.ualumniDbService.$queryRaw<
          { jobOfferId: string; count: number }[]
        >`
          WITH filtered_job_offers AS (
            SELECT j.id::text AS "jobOfferId"
            FROM
              "JobOffer" AS j
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
              filterParams.skills?.length
                ? Prisma.join(
                    filterParams.skills.map(
                      ({ categoryName, skillName }) => {
                        return Prisma.sql`bool_or(jots."technicalSkillCategoryName" ILIKE ${categoryName} AND jots."technicalSkillName" ILIKE ${skillName})`;
                      },
                    ),
                    ' AND ',
                  )
                : Prisma.sql`TRUE`
            }
            ${
              filterParams.skillCategories?.length
                ? Prisma.join(
                    filterParams.skillCategories.map(
                      (category) => Prisma.sql`AND bool_or(jots."technicalSkillCategoryName" ILIKE ${category})`,
                      ' ',
                    )
                  )
                : Prisma.sql`AND TRUE`
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

      const numberOfItems = Number(
        idsWithCount.length ? idsWithCount[0].count : 0,
      );
      const jobOffersPromises = idsWithCount.map(({ jobOfferId }) =>
        this.ualumniDbService.jobOffer.findUniqueOrThrow({
          where: { id: jobOfferId },
          include: {
            technicalSkills: {
              select: {
                technicalSkillCategoryName: true,
                technicalSkillName: true,
              },
            },
          },
        }),
      );
      const items = await Promise.all(jobOffersPromises);

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
      console.log(error)
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findOne(id: string): Promise<JobOffer | null> {
    try {
      return await this.ualumniDbService.jobOffer.findUnique({
        where: { id },
        include: {
          technicalSkills: {
            select: {
              technicalSkillCategoryName: true,
              technicalSkillName: true,
            },
          },
        },
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
      return await this.ualumniDbService.jobOffer.update({
        where: { id },
        data: updateJobOfferDto,
        include: {
          technicalSkills: {
            select: {
              technicalSkillCategoryName: true,
              technicalSkillName: true,
            },
          },
        },
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
      return await this.ualumniDbService.jobOffer.delete({
        where: { id },
        include: {
          technicalSkills: {
            select: {
              technicalSkillCategoryName: true,
              technicalSkillName: true,
            },
          },
        },
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
    const jobOffers = await this.ualumniDbService.jobOffer.updateMany({
      where: { visibleSince: { lte: oneMonthAgo } },
      data: { isVisible: false },
    });
  }
}
