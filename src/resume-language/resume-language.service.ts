import { Injectable } from '@nestjs/common';
import { CreateResumeLanguageDto } from './dto/create-resume-language.dto';
import { UpdateResumeLanguageDto } from './dto/update-resume-language.dto';
import { PrismaService } from 'src/ualumni-database/prisma.service';
import { Prisma } from '@prisma/client';
import {
  AlreadyExistsError,
  ForeignKeyError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/error/service.error';
import { ResumeLanguageDto } from './dto/resume-language.dto';
import { PageDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class ResumeLanguageService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    resumeOwnerEmail: string,
    createResumeLanguageDto: CreateResumeLanguageDto,
  ) {
    try {
      return await this.prismaService.resumeLanguage.create({
        data: {
          resumeOwnerEmail: resumeOwnerEmail,
          languageName: createResumeLanguageDto.languageName,
          masteryLevel: createResumeLanguageDto.masteryLevel,
          isVisible: createResumeLanguageDto.isVisible,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a higher education study with the given \`languageName\` (${createResumeLanguageDto.languageName}) for the user \`email\` (${resumeOwnerEmail})`,
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
  ): Promise<PageDto<ResumeLanguageDto>> {
    try {
      const totalCount = await this.prismaService.resumeLanguage.count({
        where: { resumeOwnerEmail },
      });
      const pageCount = Math.ceil(totalCount / perPage);

      if (page < 1) {
        page = 1;
      } else if (page > pageCount && pageCount > 0) {
        page = pageCount;
      }

      const data = await this.prismaService.resumeLanguage.findMany({
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
    languageName: string,
    resumeOwnerEmail: string,
  ): Promise<ResumeLanguageDto | null> {
    try {
      return await this.prismaService.resumeLanguage.findUnique({
        where: {
          resumeOwnerEmail_languageName: {
            languageName,
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
    languageName: string,
    resumeOwnerEmail: string,
    updateResumeLanguageDto: UpdateResumeLanguageDto,
  ): Promise<ResumeLanguageDto> {
    try {
      return await this.prismaService.resumeLanguage.update({
        where: {
          resumeOwnerEmail_languageName: {
            languageName,
            resumeOwnerEmail,
          },
        },
        data: {},
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no higher education study with the given \`languageName\` (${languageName})`,
            { cause: error },
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the higher education study, there already exists a higher education study with the given \`languageName\` (${updateResumeLanguageDto.languageName}) for the user \`email\` (${resumeOwnerEmail})`,
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
    languageName: string,
    resumeOwnerEmail: string,
  ): Promise<ResumeLanguageDto> {
    try {
      return await this.prismaService.resumeLanguage.delete({
        where: {
          resumeOwnerEmail_languageName: {
            languageName,
            resumeOwnerEmail,
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no higher education study with the given \`languageName\` (${languageName})`,
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
