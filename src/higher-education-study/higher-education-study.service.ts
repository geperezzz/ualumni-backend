import { Injectable } from '@nestjs/common';
import { CreateHigherEducationStudyDto } from './dto/create-higher-education-study.dto';
import { UpdateHigherEducationStudyDto } from './dto/update-higher-education-study.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/error/service.error';
import { HigherEducationStudyDto } from './dto/higher-education-study.dto';
import { PageDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class HigherEducationStudyService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createHigherEducationStudyDto: CreateHigherEducationStudyDto) {
    try {
      return await this.prismaService.higherEducationStudy.create({
        data: {
          resumeOwnerEmail: createHigherEducationStudyDto.resumeOwnerEmail,
          title: createHigherEducationStudyDto.title,
          institution: createHigherEducationStudyDto.institution,
          endDate: createHigherEducationStudyDto.endDate,
          isVisible: createHigherEducationStudyDto.isVisible,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a higher education study with the given \`title\` (${createHigherEducationStudyDto.title})`,
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
    page: number,
    perPage: number,
  ): Promise<PageDto<HigherEducationStudyDto>> {
    try {
      const totalCount = await this.prismaService.higherEducationStudy.count();
      const pageCount = Math.ceil(totalCount / perPage);

      if (page < 1) {
        page = 1;
      } else if (page > pageCount && pageCount > 0) {
        page = pageCount;
      }

      const data = await this.prismaService.higherEducationStudy.findMany({
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
    title: string,
    resumeOwnerEmail: string,
  ): Promise<HigherEducationStudyDto | null> {
    try {
      return await this.prismaService.higherEducationStudy.findUnique({
        where: {
          title_resumeOwnerEmail: {
            title,
            resumeOwnerEmail,
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
    title: string,
    resumeOwnerEmail: string,
    updateHigherEducationStudyDto: UpdateHigherEducationStudyDto,
  ): Promise<HigherEducationStudyDto> {
    try {
      return await this.prismaService.higherEducationStudy.update({
        where: {
          title_resumeOwnerEmail: {
            title,
            resumeOwnerEmail,
          },
        },
        data: {
          
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no higher education study with the given \`title\` (${title})`,
            { cause: error },
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the \`name\` to \`${updateHigherEducationStudyDto.title}\`,there already exists a higher education study with the given \`title\` (${updateHigherEducationStudyDto.title})`,
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
    title: string,
    resumeOwnerEmail: string,
  ): Promise<HigherEducationStudyDto> {
    try {
      return await this.prismaService.higherEducationStudy.delete({
        where: {
          title_resumeOwnerEmail: {
            title,
            resumeOwnerEmail,
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no higher education study with the given \`title\` (${title})`,
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
