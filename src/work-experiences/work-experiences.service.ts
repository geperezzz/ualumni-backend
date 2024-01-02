import { Injectable } from '@nestjs/common';
import { CreateWorkExperienceDto } from './dto/create-work-experience.dto';
import { UpdateWorkExperienceDto } from './dto/update-work-experience.dto';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';
import { Prisma, WorkExperience } from 'prisma/ualumni/client';
import { Page } from 'src/common/interfaces/page.interface';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';

@Injectable()
export class WorkExperiencesService {
  constructor(private ualumniDbService: UalumniDbService) {}

  async create(
    resumeOwnerId: string,
    createWorkExperienceDto: CreateWorkExperienceDto,
  ): Promise<WorkExperience> {
    try {
      return await this.ualumniDbService.workExperience.create({
        data: {
          resumeOwnerId,
          ...createWorkExperienceDto,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new NotFoundError(
            `There is no alumni with id \`${resumeOwnerId}\``,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  
  async findOne(
    resumeOwnerId: string,
    workExperienceNumber: number,
  ): Promise<WorkExperience | null> {
    try {
      return await this.ualumniDbService.workExperience.findUnique({
        where: {
          resumeOwnerId_number: {
            resumeOwnerId,
            number: workExperienceNumber,
          },
        },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findVisibleOne(
    resumeOwnerId: string,
    workExperienceNumber: number,
  ): Promise<WorkExperience | null> {
    try {
      return await this.ualumniDbService.workExperience.findFirst({
        where: {
          resumeOwnerId,
          number: workExperienceNumber,
          isVisible: true,
        },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findPage(
    resumeOwnerId: string,
    { itemsPerPage, pageNumber }: PaginationParamsDto,
  ): Promise<Page<WorkExperience>> {
    try {
      const [items, numberOfItems] = await this.ualumniDbService.$transaction([
        this.ualumniDbService.workExperience.findMany({
          where: {
            resumeOwnerId,
          },
          take: itemsPerPage,
          skip: itemsPerPage * (pageNumber - 1),
        }),
        this.ualumniDbService.workExperience.count(),
      ]);

      return {
        items,
        meta: {
          pageNumber,
          itemsPerPage,
          numberOfItems,
          numberOfPages: Math.ceil(Math.max(numberOfItems / itemsPerPage, 1)),
        },
      };
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findVisiblePage(
    resumeOwnerId: string,
    { itemsPerPage, pageNumber }: PaginationParamsDto,
  ): Promise<Page<WorkExperience>> {
    try {
      const [items, numberOfItems] = await this.ualumniDbService.$transaction([
        this.ualumniDbService.workExperience.findMany({
          where: {
            resumeOwnerId,
            isVisible: true,
          },
          take: itemsPerPage,
          skip: itemsPerPage * (pageNumber - 1),
        }),
        this.ualumniDbService.workExperience.count({
          where: {
            isVisible: true,
          },
        }),
      ]);

      return {
        items,
        meta: {
          pageNumber,
          itemsPerPage,
          numberOfItems,
          numberOfPages: Math.ceil(Math.max(numberOfItems / itemsPerPage, 1)),
        },
      };
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async update(
    resumeOwnerId: string,
    workExperienceNumber: number,
    updateWorkExperienceDto: UpdateWorkExperienceDto,
  ): Promise<WorkExperience> {
    try {
      return await this.ualumniDbService.workExperience.update({
        where: {
          resumeOwnerId_number: {
            resumeOwnerId,
            number: workExperienceNumber,
          },
        },
        data: updateWorkExperienceDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no work experience #${workExperienceNumber} for alumni with id \`${resumeOwnerId}\``,
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
    resumeOwnerId: string,
    workExperienceNumber: number,
  ): Promise<WorkExperience> {
    try {
      return await this.ualumniDbService.workExperience.delete({
        where: {
          resumeOwnerId_number: {
            resumeOwnerId,
            number: workExperienceNumber,
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no work experience #${workExperienceNumber} for alumni with id \`${resumeOwnerId}\``,
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
