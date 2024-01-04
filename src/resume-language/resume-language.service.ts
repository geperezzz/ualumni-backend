import { Injectable } from '@nestjs/common';
import { CreateResumeLanguageDto } from './dto/create-resume-language.dto';
import { UpdateResumeLanguageDto } from './dto/update-resume-language.dto';
import { MasteryLevel, Prisma } from 'prisma/ualumni/client';
import {
  AlreadyExistsError,
  ForeignKeyError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { ResumeLanguageDto } from './dto/resume-language.dto';
import { PageDto } from 'src/common/dto/paginated-response.dto';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';

@Injectable()
export class ResumeLanguageService {
  constructor(private readonly ualumniDbService: UalumniDbService) {}

  async create(
    resumeOwnerId: string,
    createResumeLanguageDto: CreateResumeLanguageDto,
  ) {
    try {
      return await this.ualumniDbService.resumeLanguage.create({
        data: {
          resumeOwnerId,
          languageName: createResumeLanguageDto.languageName,
          masteryLevel: createResumeLanguageDto.masteryLevel as MasteryLevel,
          isVisible: createResumeLanguageDto.isVisible,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a language with the given \`languageName\` (${createResumeLanguageDto.languageName}) for the alumni with \`id\` (${resumeOwnerId})`,
            { cause: error },
          );
        }
        if (error.code === 'P2003') {
          throw new ForeignKeyError(
            `There is no language with the name (${createResumeLanguageDto.languageName}))`,
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
    resumeOwnerId: string,
    page: number,
    perPage: number,
  ): Promise<PageDto<ResumeLanguageDto>> {
    try {
      const totalCount = await this.ualumniDbService.resumeLanguage.count({
        where: { resumeOwnerId },
      });
      const pageCount = Math.ceil(totalCount / perPage);

      if (page < 1) {
        page = 1;
      } else if (page > pageCount && pageCount > 0) {
        page = pageCount;
      }

      const data = await this.ualumniDbService.resumeLanguage.findMany({
        where: { resumeOwnerId },
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
    resumeOwnerId: string,
  ): Promise<ResumeLanguageDto | null> {
    try {
      return await this.ualumniDbService.resumeLanguage.findUnique({
        where: {
          resumeOwnerId_languageName: {
            languageName,
            resumeOwnerId,
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
    resumeOwnerId: string,
    updateResumeLanguageDto: UpdateResumeLanguageDto,
  ): Promise<ResumeLanguageDto> {
    try {
      return await this.ualumniDbService.resumeLanguage.update({
        where: {
          resumeOwnerId_languageName: {
            languageName,
            resumeOwnerId,
          },
        },
        data: {
          languageName: updateResumeLanguageDto.languageName,
          masteryLevel: updateResumeLanguageDto.masteryLevel as MasteryLevel,
          isVisible: updateResumeLanguageDto.isVisible,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no language with the given \`languageName\` (${languageName}) for the alumni with \`id\` (${resumeOwnerId})`,
            { cause: error },
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the language, there already exists a language with the given \`languageName\` (${updateResumeLanguageDto.languageName}) for the alumni with \`id\` (${resumeOwnerId})`,
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
    resumeOwnerId: string,
  ): Promise<ResumeLanguageDto> {
    try {
      return await this.ualumniDbService.resumeLanguage.delete({
        where: {
          resumeOwnerId_languageName: {
            languageName,
            resumeOwnerId,
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no language with the given \`languageName\` (${languageName}) for the alumni with \`id\` (${resumeOwnerId})`,
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
