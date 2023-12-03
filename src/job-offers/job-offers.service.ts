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

  async findPageRandomly({
    pageNumber,
    itemsPerPage,
    randomizationSeed,
  }: RandomPaginationParamsDto): Promise<RandomPage<JobOffer>> {
    randomizationSeed ??= Math.random();

    try {
      let [_, items, numberOfItems] = await this.prismaService.$transaction([
        this.prismaService.$queryRaw`
          SELECT 0
          FROM (
            SELECT setseed(${randomizationSeed})
          ) AS randomization_seed
        `,
        this.prismaService.$queryRaw<JobOffer[]>`
          SELECT *
          FROM "JobOffer"
          ORDER BY random()
          LIMIT ${itemsPerPage}
          OFFSET ${itemsPerPage * (pageNumber - 1)}
        `,
        this.prismaService.jobOffer.count(),
      ]);

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
}
