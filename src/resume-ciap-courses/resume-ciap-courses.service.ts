import { Injectable } from '@nestjs/common';
import { CreateResumeCiapCourseDto } from './dto/create-resume-ciap-course.dto';
import { ResumeCiapCourseDto } from './dto/resume-ciap-course.dto';
import { Prisma } from 'prisma/ualumni/client';
import {
  ForeignKeyError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { PageDto } from 'src/common/dto/paginated-response.dto';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';
import { UcabDbService } from 'src/ucab-db/ucab-db.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UpdateResumeCiapCourseDto } from './dto/update-resume-ciap-course.dto';

@Injectable()
export class ResumeCiapCoursesService {
  constructor(
    private ualumniDbService: UalumniDbService,
    private ucabDbService: UcabDbService,
  ) {}

  private async findUcabDbCiapCourse(name: string, date: Date) {
    try {
      const data = await this.ucabDbService.ciapCourse.findUnique({
        where: {
          name_completionDate: {
            name: name,
            completionDate: date,
          },
        },
        include: {
          enrolledStudents: true,
        },
      });
      return data;
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async synchronize() {
    try {
      //find ualumniDb courses with enrolledStudents
      const ualumniDbCiapCourses =
        await this.ualumniDbService.ciapCourse.findMany({
          include: {
            resumesListingThis: true,
          },
        });

      //find course with enrolledStudents in ucabDb
      for (let ualumniDbCiapCourse of ualumniDbCiapCourses) {
        const ucabDbCiapCourse = await this.findUcabDbCiapCourse(
          ualumniDbCiapCourse.name,
          ualumniDbCiapCourse.date,
        );

        //check if alumni in ualumniDb is already enrolled
        if (ucabDbCiapCourse) {
          for (let ucabDbAlumni of ucabDbCiapCourse.enrolledStudents) {
            const ualumniDbAlumniEnrolled =
              ualumniDbCiapCourse.resumesListingThis.find(
                (ualumniDbAlumni) =>
                  ualumniDbAlumni.resumeOwnerEmail === ucabDbAlumni.email,
              );

            //create if not exists
            if (!ualumniDbAlumniEnrolled) {
              await this.ualumniDbService.resumeCiapCourse.create({
                data: {
                  isVisible: true,
                  courseId: ualumniDbCiapCourse.id,
                  resumeOwnerEmail: ucabDbAlumni.email,
                },
              });
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new ForeignKeyError(
            `Cannot create. There is no ciap course or alumni in UalumniDB with the given \`data\``,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async create(
    ownerEmail: string,
    createResumeCiapCourseDto: CreateResumeCiapCourseDto,
  ): Promise<ResumeCiapCourseDto> {
    try {
      return await this.ualumniDbService.resumeCiapCourse.create({
        data: {
          isVisible: true,
          courseId: createResumeCiapCourseDto.id,
          resumeOwnerEmail: ownerEmail,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new ForeignKeyError(
            `There is no alumni with the email (${ownerEmail}), or there is no CIAP course with the id (${createResumeCiapCourseDto.id}))`,
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
    ownerEmail: string,
    pageNumber: number,
    itemsPerPage: number,
  ): Promise<PageDto<ResumeCiapCourseDto>> {
    try {
      const totalCount = await this.ualumniDbService.resumeCiapCourse.count({
        where: { resumeOwnerEmail: ownerEmail },
      });
      const pageCount = Math.ceil(totalCount / itemsPerPage);

      if (totalCount == 0 || pageNumber < 1) {
        pageNumber = 1;
      } else if (pageNumber > pageCount) {
        pageNumber = pageCount;
      }
      const data = await this.ualumniDbService.resumeCiapCourse.findMany({
        where: {
          resumeOwnerEmail: ownerEmail,
        },
        take: itemsPerPage,
        skip: (pageNumber - 1) * itemsPerPage,
      });
      return {
        page: pageNumber,
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
    ownerEmail: string,
    id: string,
  ): Promise<ResumeCiapCourseDto | null> {
    try {
      return await this.ualumniDbService.resumeCiapCourse.findUnique({
        where: {
          resumeOwnerEmail_courseId: {
            resumeOwnerEmail: ownerEmail,
            courseId: id,
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
    ownerEmail: string,
    id: string,
    updateResumeCiapCourseDto: UpdateResumeCiapCourseDto,
  ): Promise<ResumeCiapCourseDto> {
    try {
      return await this.ualumniDbService.resumeCiapCourse.update({
        where: {
          resumeOwnerEmail_courseId: {
            resumeOwnerEmail: ownerEmail,
            courseId: id,
          },
        },
        data: {
          isVisible: updateResumeCiapCourseDto.isVisible,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForeignKeyError(
            `There is no ciap course did by alumni with the \`email\` (${ownerEmail}) with the given \`id\` (${id})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(ownerEmail: string, id: string): Promise<ResumeCiapCourseDto> {
    try {
      return await this.ualumniDbService.resumeCiapCourse.delete({
        where: {
          resumeOwnerEmail_courseId: {
            resumeOwnerEmail: ownerEmail,
            courseId: id,
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForeignKeyError(
            `There is no ciap course did by alumni with the \`email\` (${ownerEmail}) with the given \`id\` (${id})`,
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
