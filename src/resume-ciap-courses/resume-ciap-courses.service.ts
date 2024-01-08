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

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async synchronizeBothDb() {
    try {
      const registeredCoursesTakenPerAlumni = await this.ualumniDbService.alumni.findMany({
        select: {
          associatedUser: {
            select: {
              id: true,
              email: true,
            },
          },
          resume: {
            select: {
              ciapCourses: {
                select: {
                  course: true,
                }
              }
            }
          }
        }
      });

      const alumniEmails = registeredCoursesTakenPerAlumni.map(
        ({ associatedUser }) => associatedUser.email
      );

      const ucabCoursesTakenPerAlumni = await this.ucabDbService.student.findMany({
        select: {
          email: true,
          coursesTaken: {
            select: {
              name: true,
              completionDate: true,
            }
          }
        },
        where: {
          email: {
            in: alumniEmails
          },
        }
      });

      for (const { email: currentAlumniEmail, coursesTaken: ucabCoursesTakenByCurrentAlumni } of ucabCoursesTakenPerAlumni) {
        const registeredCoursesTakenByCurrentAlumni =
          registeredCoursesTakenPerAlumni.find(
            ({ associatedUser }) => associatedUser.email === currentAlumniEmail
          )!;
        const currentAlumniId = registeredCoursesTakenByCurrentAlumni.associatedUser.id;
        const currentAlumniCourses = registeredCoursesTakenByCurrentAlumni.resume!.ciapCourses.map(({ course }) => course);

        for (const ucabCourse of ucabCoursesTakenByCurrentAlumni) {
          const isMissing = !currentAlumniCourses.some(
            registeredCourse => registeredCourse.name === ucabCourse.name && registeredCourse.date === ucabCourse.completionDate
          );
          if (!isMissing) {
            continue;
          }

          const missingCourse = await this.ualumniDbService.ciapCourse.findUnique({
            select: {
              id: true
            },
            where: {
              name_date: {
                name: ucabCourse.name,
                date: ucabCourse.completionDate
              }
            }
          });

          this.ualumniDbService.resumeCiapCourse.create({
            data: {
              resumeOwnerId: currentAlumniId,
              courseId: missingCourse!.id,
              isVisible: true,
            }
          });
        }
      }
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred while synchronizing resume-ciap-courses', {
        cause: error,
      });
    }
  }

  async create(
    resumeOwnerId: string,
    createResumeCiapCourseDto: CreateResumeCiapCourseDto,
  ): Promise<ResumeCiapCourseDto> {
    try {
      return await this.ualumniDbService.resumeCiapCourse.create({
        data: {
          isVisible: true,
          courseId: createResumeCiapCourseDto.id,
          resumeOwnerId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new ForeignKeyError(
            `There is no alumni with the id (${resumeOwnerId}), or there is no CIAP course with the id (${createResumeCiapCourseDto.id}))`,
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
    pageNumber: number,
    itemsPerPage: number,
  ): Promise<PageDto<ResumeCiapCourseDto>> {
    try {
      const totalCount = await this.ualumniDbService.resumeCiapCourse.count({
        where: { resumeOwnerId },
      });
      const pageCount = Math.ceil(totalCount / itemsPerPage);

      if (totalCount == 0 || pageNumber < 1) {
        pageNumber = 1;
      } else if (pageNumber > pageCount) {
        pageNumber = pageCount;
      }
      const data = await this.ualumniDbService.resumeCiapCourse.findMany({
        where: {
          resumeOwnerId,
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
    resumeOwnerId: string,
    id: string,
  ): Promise<ResumeCiapCourseDto | null> {
    try {
      return await this.ualumniDbService.resumeCiapCourse.findUnique({
        where: {
          resumeOwnerId_courseId: {
            resumeOwnerId,
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
    resumeOwnerId: string,
    id: string,
    updateResumeCiapCourseDto: UpdateResumeCiapCourseDto,
  ): Promise<ResumeCiapCourseDto> {
    try {
      return await this.ualumniDbService.resumeCiapCourse.update({
        where: {
          resumeOwnerId_courseId: {
            resumeOwnerId,
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
            `There is no ciap course did by alumni with the \`email\` (${resumeOwnerId}) with the given \`id\` (${id})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(resumeOwnerId: string, id: string): Promise<ResumeCiapCourseDto> {
    try {
      return await this.ualumniDbService.resumeCiapCourse.delete({
        where: {
          resumeOwnerId_courseId: {
            resumeOwnerId,
            courseId: id,
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForeignKeyError(
            `There is no ciap course did by alumni with the \`id\` (${resumeOwnerId}) with the given \`id\` (${id})`,
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
