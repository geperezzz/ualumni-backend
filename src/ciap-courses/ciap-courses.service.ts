import { Injectable } from '@nestjs/common';
import { CreateCiapCourseDto } from './dto/create-ciap-course.dto';
import { UpdateCiapCourseDto } from './dto/update-ciap-course.dto';
import { CiapCourseDto } from './dto/ciap-course.dto';
import { Prisma } from '../../prisma/ualumni/client';
import {
  AlreadyExistsError,
  ForeignKeyError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { PageDto } from 'src/common/dto/paginated-response.dto';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UcabDbService } from 'src/ucab-db/ucab-db.service';

@Injectable()
export class CiapCoursesService {
  constructor(
    private readonly ualumniDbService: UalumniDbService,
    private readonly ucabDbService: UcabDbService,
  ) {}

  private async findUalumniDbCiapCourse(name: string, date: Date) {
    try {
      const data = await this.ualumniDbService.ciapCourse.findUnique({
        where: {
          name_date: {
            name: name,
            date: date,
          },
        },
      });
      return data ? data : undefined;
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async create(
    createCiapCourseDto: CreateCiapCourseDto,
  ): Promise<CiapCourseDto> {
    try {
      return await this.ualumniDbService.ciapCourse.create({
        data: {
          id: createCiapCourseDto.id,
          name: createCiapCourseDto.name,
          date: new Date(createCiapCourseDto.date).toISOString(),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a CIAP course with the name and date (${createCiapCourseDto.name}, ${createCiapCourseDto.date})`,
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
      const totalCount = await this.ualumniDbService.ciapCourse.count();
      const pageCount = Math.ceil(totalCount / perPage);

      if (page < 1) {
        page = 1;
      } else if (page > pageCount && pageCount > 0) {
        page = pageCount;
      }

      const data = await this.ualumniDbService.ciapCourse.findMany({
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

  async findOne(id: string): Promise<CiapCourseDto | null> {
    try {
      return await this.ualumniDbService.ciapCourse.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async update(
    id: string,
    updateCiapCourseDto: UpdateCiapCourseDto,
  ): Promise<CiapCourseDto> {
    try {
      return await this.ualumniDbService.ciapCourse.update({
        where: { id },
        data: {
          id: updateCiapCourseDto.id,
          name: updateCiapCourseDto.name,
          date: updateCiapCourseDto.date
            ? new Date(updateCiapCourseDto.date).toISOString()
            : undefined,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no CIAP course with the given \`id\` (${id})`,
            { cause: error },
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the \`name and date\` to \`${updateCiapCourseDto.name}, ${updateCiapCourseDto.date}\`,there already exists a CIAP course with the given \`name and date\` (${updateCiapCourseDto.name}, ${updateCiapCourseDto.date})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(id: string): Promise<CiapCourseDto> {
    try {
      return await this.ualumniDbService.ciapCourse.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no CIAP course with the given \`id\` (${id})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  //Create ciap course if not exists in ualumni db
  @Cron(CronExpression.EVERY_10_SECONDS)
  async synchronize() {
    try {
      const ucabDbCiapCourses = await this.ucabDbService.ciapCourse.findMany();

      for (let ucabDbCiapCourse of ucabDbCiapCourses) {
        const ualumniDbCiapCourse = await this.findUalumniDbCiapCourse(
          ucabDbCiapCourse.name,
          ucabDbCiapCourse.completionDate,
        );
        if (!ualumniDbCiapCourse) {
          await this.ualumniDbService.ciapCourse.create({
            data: {
              name: ucabDbCiapCourse.name,
              date: ucabDbCiapCourse.completionDate,
            },
          });
        }
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new ForeignKeyError(
            `Cannot update. There is no career in UalumniDB with the given \`careerName\``,
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
