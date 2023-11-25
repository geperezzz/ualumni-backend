import { Injectable } from '@nestjs/common';
import { CreateCiapCourseDto } from './dto/create-ciap-course.dto';
import { UpdateCiapCourseDto } from './dto/update-ciap-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CiapCourseDto } from './dto/ciap-course.dto';
import { Prisma } from '@prisma/client';
import {
  AlreadyExistsError,
  UnexpectedError,
} from 'src/common/error/service.error';
import { PageDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class CiapCoursesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createCiapCourseDto: CreateCiapCourseDto,
  ): Promise<CiapCourseDto> {
    try {
      return await this.prismaService.ciapCourse.create({
        data: {
          name: createCiapCourseDto.name,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a CIAP course with the given \`name\` (${createCiapCourseDto.name})`,
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
  ): Promise<PageDto<CiapCourseDto>> {
    try {
      const totalCount = await this.prismaService.ciapCourse.count();
      const pageCount = Math.ceil(totalCount / perPage);

      if (page < 1) {
        page = 1;
      } else if (page > pageCount && pageCount > 0) {
        page = pageCount;
      }

      const data = await this.prismaService.ciapCourse.findMany({
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

  async findOne(name: string): Promise<CiapCourseDto | null> {
    try {
      return await this.prismaService.ciapCourse.findUnique({
        where: { name: name },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  update(id: number, updateCiapCourseDto: UpdateCiapCourseDto) {
    return `This action updates a #${id} ciapCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} ciapCourse`;
  }
}
