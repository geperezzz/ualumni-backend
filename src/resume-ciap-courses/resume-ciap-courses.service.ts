import { Injectable } from '@nestjs/common';
import { CreateResumeCiapCourseDto } from './dto/create-resume-ciap-course.dto';
import { ResumeCiapCourseDto } from './dto/resume-ciap-course.dto';
import { PrismaService } from 'src/ualumni-database/prisma.service';
import { Prisma } from '@prisma/client';
import {
  ForeignKeyError,
  UnexpectedError,
} from 'src/common/errors/service.error';

@Injectable()
export class ResumeCiapCoursesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    ownerEmail: string,
    createResumeCiapCourseDto: CreateResumeCiapCourseDto,
  ): Promise<ResumeCiapCourseDto> {
    try {
      return await this.prismaService.resumeCiapCourse.create({
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

  async findAll(ownerEmail: string): Promise<ResumeCiapCourseDto[]> {
    try {
      return await this.prismaService.resumeCiapCourse.findMany({
        where: {
          resumeOwnerEmail: ownerEmail,
        },
      });
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
      return await this.prismaService.resumeCiapCourse.findUnique({
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

  async remove(ownerEmail: string, id: string): Promise<ResumeCiapCourseDto> {
    try {
      return await this.prismaService.resumeCiapCourse.delete({
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
