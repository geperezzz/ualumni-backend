import { Injectable } from '@nestjs/common';
import { CreateIndustryOfInterestDto } from './dto/create-industry-of-interest.dto';
import { UpdateIndustryOfInterestDto } from './dto/update-industry-of-interest.dto';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/error/service.error';
import { IndustryOfInterestDto } from './dto/industry-of-interest.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PageDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class IndustryOfInterestService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createIndustryOfInterestDto: CreateIndustryOfInterestDto,
  ): Promise<IndustryOfInterestDto> {
    try {
      return await this.prismaService.industryOfInterest.create({
        data: createIndustryOfInterestDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a industry of interest with the given \`name\` (${createIndustryOfInterestDto.industryName})`,
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
      const totalCount = await this.prismaService.industryOfInterest.count({
        where: { resumeOwnerEmail },
      });
      const pageCount = Math.ceil(totalCount / perPage);

      if (totalCount == 0 || page < 1) {
        page = 1;
      } else if (page > pageCount) {
        page = pageCount;
      }

      const data = await this.prismaService.industryOfInterest.findMany({
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
      return await this.prismaService.industryOfInterest.findUnique({
        where: {
          industryName_resumeOwnerEmail: { industryName, resumeOwnerEmail },
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
      return await this.prismaService.industryOfInterest.update({
        where: {
          industryName_resumeOwnerEmail: { industryName, resumeOwnerEmail },
        },
        data: updateIndustryOfInterestDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no industry of interest with the given \`name\` (${name})`,
            { cause: error },
          );
        } else if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the \`name\` to \`${updateIndustryOfInterestDto.industryName}\`, there already exists a industry of interest with the given \`name\` (${updateIndustryOfInterestDto.industryName})`,
            { cause: error },
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
      return await this.prismaService.industryOfInterest.delete({
        where: {
          industryName_resumeOwnerEmail: { industryName, resumeOwnerEmail },
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
