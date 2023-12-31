import { Injectable } from '@nestjs/common';
import { CreateSkillCategoryDto } from './dto/create-skill-category.dto';
import { UpdateSkillCategoryDto } from './dto/update-skill-category.dto';
import { SkillCategoryDto } from './dto/skill-category.dto';
import { Prisma } from 'prisma/ualumni/client';
import {
  AlreadyExistsError,
  ForeignKeyError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { PageDto } from 'src/common/dto/paginated-response.dto';
import { UpdateRelatedCareersDto } from './dto/update-related-careers.dto';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';

@Injectable()
export class SkillCategoryService {
  constructor(private readonly ualumniDbService: UalumniDbService) {}

  async create(
    createSkillCategoryDto: CreateSkillCategoryDto,
  ): Promise<SkillCategoryDto> {
    try {
      return await this.ualumniDbService.skillCategory.create({
        data: {
          name: createSkillCategoryDto.name,
          relatedCareers: {
            connect: createSkillCategoryDto.relatedCareersNames.map((name) => ({
              name,
            })),
          },
        },
        include: { relatedCareers: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a skill category with the given name (${createSkillCategoryDto.name})`,
            { cause: error },
          );
        }
        if (error.code === 'P2025') {
          throw new ForeignKeyError(
            `There is no career/s with the given name/s (${createSkillCategoryDto.relatedCareersNames})`,
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
  ): Promise<PageDto<SkillCategoryDto>> {
    try {
      const totalCount = await this.ualumniDbService.skillCategory.count();
      const pageCount = Math.ceil(totalCount / perPage);

      if (page < 1) {
        page = 1;
      } else if (page > pageCount && pageCount > 0) {
        page = pageCount;
      }

      const data = await this.ualumniDbService.skillCategory.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
      });

      return {
        page,
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

  async findManyWithCareers(
    page: number,
    perPage: number,
  ): Promise<PageDto<SkillCategoryDto>> {
    try {
      const totalCount = await this.ualumniDbService.skillCategory.count();
      const pageCount = Math.ceil(totalCount / perPage);

      if (page < 1) {
        page = 1;
      } else if (page > pageCount && pageCount > 0) {
        page = pageCount;
      }

      const data = await this.ualumniDbService.skillCategory.findMany({
        take: perPage,
        skip: (page - 1) * perPage,
        include: { relatedCareers: true },
      });

      return {
        page,
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

  async findManyByCareerName(
    careerName: string,
    page: number,
    perPage: number,
  ): Promise<PageDto<SkillCategoryDto>> {
    try {
      const totalCount = await this.ualumniDbService.skillCategory.count({
        where: { relatedCareers: { some: { name: careerName } } },
      });
      const pageCount = Math.ceil(totalCount / perPage);

      if (page < 1) {
        page = 1;
      } else if (page > pageCount && pageCount > 0) {
        page = pageCount;
      }

      const data = await this.ualumniDbService.skillCategory.findMany({
        where: { relatedCareers: { some: { name: careerName } } },
        take: perPage,
        skip: (page - 1) * perPage,
        include: { relatedCareers: true },
      });

      return {
        page,
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

  async findOne(name: string): Promise<SkillCategoryDto | null> {
    try {
      return await this.ualumniDbService.skillCategory.findUnique({
        where: { name },
        include: { relatedCareers: true },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async update(
    name: string,
    updateSkillCategoryDto: UpdateSkillCategoryDto,
  ): Promise<SkillCategoryDto> {
    try {
      return await this.ualumniDbService.skillCategory.update({
        where: { name },
        data: {
          name: updateSkillCategoryDto.name,
        },
        include: { relatedCareers: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no skill category with the given name (${name})`,
            { cause: error },
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a skill category with the given name (${updateSkillCategoryDto.name})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async updateRelatedCareers(
    name: string,
    updateRelatedCareersDto: UpdateRelatedCareersDto,
  ): Promise<SkillCategoryDto> {
    try {
      return await this.ualumniDbService.skillCategory.update({
        where: { name },
        data: {
          relatedCareers: {
            disconnect: updateRelatedCareersDto.removeRelatedCareersNames?.map(
              (name) => ({ name }),
            ),
            connect: updateRelatedCareersDto.addRelatedCareersNames?.map(
              (name) => ({ name }),
            ),
          },
        },
        include: { relatedCareers: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error.code);
        if (error.code === 'P2016') {
          throw new NotFoundError(
            `There is no skill category with the given name (${name})`,
            { cause: error },
          );
        }
        if (error.code === 'P2025') {
          throw new ForeignKeyError(
            `There is no career with the given name/s (${updateRelatedCareersDto.addRelatedCareersNames})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(name: string): Promise<SkillCategoryDto> {
    try {
      return await this.ualumniDbService.skillCategory.delete({
        where: { name },
        include: { relatedCareers: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no skill category with the given name (${name})`,
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
