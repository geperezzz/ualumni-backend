import { Injectable } from '@nestjs/common';
import { CreateHigherEducationStudyDto } from './dto/create-higher-education-study.dto';
import { UpdateHigherEducationStudyDto } from './dto/update-higher-education-study.dto';
import { Prisma } from 'prisma/ualumni/client';
import {
  AlreadyExistsError,
  ForeignKeyError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { HigherEducationStudyDto } from './dto/higher-education-study.dto';
import { PageDto } from 'src/common/dto/paginated-response.dto';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';

@Injectable()
export class HigherEducationStudyService {
  constructor(private readonly ualumniDbService: UalumniDbService) {}

  async create(
    resumeOwnerEmail: string,
    createHigherEducationStudyDto: CreateHigherEducationStudyDto,
  ) {
    try {
      return await this.ualumniDbService.higherEducationStudy.create({
        data: {
          resumeOwnerEmail: resumeOwnerEmail,
          title: createHigherEducationStudyDto.title,
          institution: createHigherEducationStudyDto.institution,
          endDate: new Date(
            createHigherEducationStudyDto.endDate,
          ).toISOString(),
          isVisible: createHigherEducationStudyDto.isVisible,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a higher education study with the given \`title\` (${createHigherEducationStudyDto.title}) for the user \`email\` (${resumeOwnerEmail})`,
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
  ): Promise<PageDto<HigherEducationStudyDto>> {
    try {
      const totalCount = await this.ualumniDbService.higherEducationStudy.count(
        {
          where: { resumeOwnerEmail },
        },
      );
      const pageCount = Math.ceil(totalCount / perPage);

      if (page < 1) {
        page = 1;
      } else if (page > pageCount && pageCount > 0) {
        page = pageCount;
      }

      const data = await this.ualumniDbService.higherEducationStudy.findMany({
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
    title: string,
    resumeOwnerEmail: string,
  ): Promise<HigherEducationStudyDto | null> {
    try {
      return await this.ualumniDbService.higherEducationStudy.findUnique({
        where: {
          resumeOwnerEmail_title: {
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
      return await this.ualumniDbService.higherEducationStudy.update({
        where: {
          resumeOwnerEmail_title: {
            title,
            resumeOwnerEmail,
          },
        },
        data: {},
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
            `Cannot update the higher education study, there already exists a higher education study with the given \`title\` (${updateHigherEducationStudyDto.title}) for the user \`email\` (${resumeOwnerEmail})`,
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
      return await this.ualumniDbService.higherEducationStudy.delete({
        where: {
          resumeOwnerEmail_title: {
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
