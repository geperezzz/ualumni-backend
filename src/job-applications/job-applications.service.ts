import { Injectable } from '@nestjs/common';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { JobApplication, Prisma } from 'prisma/ualumni/client';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { Page } from 'src/common/interfaces/page.interface';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';

@Injectable()
export class JobApplicationsService {
  constructor(private ualumniDbService: UalumniDbService) {}

  async create(
    alumniId: string,
    createJobApplicationDto: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    try {
      return await this.ualumniDbService.jobApplication.create({
        data: {
          alumniWhoAppliedId: alumniId,
          ...createJobApplicationDto,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a job application for offer with \`id\` equal to \`${createJobApplicationDto.jobOfferId}\` corresponding to alumni with \`id\` equal to \`${alumniId}\``,
            { cause: error },
          );
        }
        if (error.code === 'P2003') {
          let fieldName = error.meta?.field_name as string;
          if (fieldName.includes('jobOfferId')) {
            throw new NotFoundError(
              `There is no job offer with \`id\` equal to \`${createJobApplicationDto.jobOfferId}\``,
            );
          }
          if (fieldName.includes('alumniWhoAppliedId')) {
            throw new NotFoundError(
              `There is no alumni with \`id\` equal to \`${alumniId}\``,
            );
          }
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findPage(
    alumniId: string,
    { itemsPerPage, pageNumber }: PaginationParamsDto,
  ): Promise<Page<JobApplication>> {
    try {
      let [items, numberOfItems] = await this.ualumniDbService.$transaction([
        this.ualumniDbService.jobApplication.findMany({
          where: { alumniWhoAppliedId: alumniId },
          take: itemsPerPage,
          skip: itemsPerPage * (pageNumber - 1),
        }),
        this.ualumniDbService.jobApplication.count(),
      ]);

      return {
        items,
        meta: {
          pageNumber,
          itemsPerPage,
          numberOfItems,
          numberOfPages: Math.ceil(numberOfItems / itemsPerPage),
        },
      };
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findOne(
    alumniId: string,
    jobOfferId: string,
  ): Promise<JobApplication | null> {
    try {
      return await this.ualumniDbService.jobApplication.findUnique({
        where: {
          jobOfferId_alumniWhoAppliedId: {
            jobOfferId,
            alumniWhoAppliedId: alumniId,
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
    alumniId: string,
    jobOfferId: string,
    updateJobApplicationDto: UpdateJobApplicationDto,
  ): Promise<JobApplication> {
    try {
      return await this.ualumniDbService.jobApplication.update({
        where: {
          jobOfferId_alumniWhoAppliedId: {
            jobOfferId,
            alumniWhoAppliedId: alumniId,
          },
        },
        data: updateJobApplicationDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no job application for offer with \`id\` equal to \`${jobOfferId}\` corresponding to alumni with \`id\` equal to \`${alumniId}\``,
            { cause: error },
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the \`jobOfferId\` to \`${updateJobApplicationDto.jobOfferId}\`, there already exists a job application for offer with \`id\` equal to \`${updateJobApplicationDto.jobOfferId}\` corresponding to alumni with \`id\` equal to \`${alumniId}\``,
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
    alumniId: string,
    jobOfferId: string,
  ): Promise<JobApplication> {
    try {
      return await this.ualumniDbService.jobApplication.delete({
        where: {
          jobOfferId_alumniWhoAppliedId: {
            jobOfferId,
            alumniWhoAppliedId: alumniId,
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no job application for offer with \`id\` equal to \`${jobOfferId}\` corresponding to alumni with \`id\` equal to \`${alumniId}\``,
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
