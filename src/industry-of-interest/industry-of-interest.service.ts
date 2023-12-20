import { Injectable } from '@nestjs/common';
import { CreateIndustryOfInterestDto } from './dto/create-industry-of-interest.dto';
import { UpdateIndustryOfInterestDto } from './dto/update-industry-of-interest.dto';
import {
  AlreadyExistsError,
  ForeignKeyError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { IndustryOfInterestDto } from './dto/industry-of-interest.dto';
import { Prisma } from 'prisma/ualumni/client';
import { PageDto } from 'src/common/dto/paginated-response.dto';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';

@Injectable()
export class IndustryOfInterestService {
  constructor(private readonly ualumniDbService: UalumniDbService) {}

  async create(
    resumeOwnerEmail: string,
    createIndustryOfInterestDto: CreateIndustryOfInterestDto,
  ): Promise<IndustryOfInterestDto> {
    try {
      return await this.ualumniDbService.industryOfInterest.create({
        data: {
          resumeOwnerEmail: resumeOwnerEmail,
          ...createIndustryOfInterestDto,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a industry of interest with the given \`name\` (${createIndustryOfInterestDto.industryName}) for the user \`email\`: ${resumeOwnerEmail}`,
            { cause: error },
          );
        }
        if (error.code === 'P2003') {
          throw new ForeignKeyError(
            `There is no user with the given \`email\` (${resumeOwnerEmail})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findMany(
    resumeOwnerEmail: string,
    page: number,
    perPage: number,
  ): Promise<PageDto<IndustryOfInterestDto>> {
    try {
      const totalCount = await this.ualumniDbService.industryOfInterest.count({
        where: { resumeOwnerEmail },
      });
      const pageCount = Math.ceil(totalCount / perPage);

      if (totalCount == 0 || page < 1) {
        page = 1;
      } else if (page > pageCount) {
        page = pageCount;
      }

      const data = await this.ualumniDbService.industryOfInterest.findMany({
        where: { resumeOwnerEmail },
        take: perPage,
        skip: (page - 1) * perPage,
      });

      return {
        page: page,
        perPage: data.length,
        pageCount,
        totalCount,
        items: data,
      };
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findOne(
    resumeOwnerEmail: string,
    industryName: string,
  ): Promise<IndustryOfInterestDto | null> {
    try {
      return await this.ualumniDbService.industryOfInterest.findUnique({
        where: {
          resumeOwnerEmail_industryName: { industryName, resumeOwnerEmail },
        },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async update(
    resumeOwnerEmail: string,
    industryName: string,
    updateIndustryOfInterestDto: UpdateIndustryOfInterestDto,
  ): Promise<IndustryOfInterestDto> {
    try {
      return await this.ualumniDbService.industryOfInterest.update({
        where: {
          resumeOwnerEmail_industryName: { industryName, resumeOwnerEmail },
        },
        data: updateIndustryOfInterestDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no industry of interest with the given \`name\` (${industryName})`,
            { cause: error },
          );
        } else if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the \`name\` to \`${updateIndustryOfInterestDto.industryName}\`, there already exists a industry of interest with the given \`name\` (${updateIndustryOfInterestDto.industryName}) for the user \`email\`: ${resumeOwnerEmail}`,
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(
    resumeOwnerEmail: string,
    industryName: string,
  ): Promise<IndustryOfInterestDto> {
    try {
      return await this.ualumniDbService.industryOfInterest.delete({
        where: {
          resumeOwnerEmail_industryName: { industryName, resumeOwnerEmail },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no industry of interest with the given \`name\` (${industryName})`,
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
