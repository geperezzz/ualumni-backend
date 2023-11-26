import { Injectable } from '@nestjs/common';
import { CreateTechnicalSkillDto } from './dto/create-technical-skill.dto';
import { UpdateTechnicalSkillDto } from './dto/update-technical-skill.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TechnicalSkillDto } from './dto/technical-skill.dto';
import { Prisma } from '@prisma/client';
import { AlreadyExistsError, ForeignKeyError, NotFoundError, UnexpectedError } from 'src/common/error/service.error';
import { PageDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class TechnicalSkillService {
  constructor(private readonly prismaService: PrismaService) {}

   async create(
    createTechnicalSkillDto: CreateTechnicalSkillDto,
  ): Promise<TechnicalSkillDto> {
    try {
      return await this.prismaService.technicalSkill.create({
        data: createTechnicalSkillDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a technical skill with the given \`name\` (${createTechnicalSkillDto.name}) for the given \`category\` (${createTechnicalSkillDto.categoryName})`,
            { cause: error },
          );
        }
        if (error.code === 'P2003') {
          throw new ForeignKeyError(
            `There is no category with the given \`categoryName\` (${createTechnicalSkillDto.categoryName})`,
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
    categoryName: string,
    page: number,
    perPage: number,
  ): Promise<PageDto<TechnicalSkillDto>> {
    try {
      const totalCount = await this.prismaService.technicalSkill.count({
        where: { categoryName },
      });
      const pageCount = Math.ceil(totalCount / perPage);

      if (totalCount == 0 || page < 1) {
        page = 1;
      } else if (page > pageCount) {
        page = pageCount;
      }

      const data = await this.prismaService.technicalSkill.findMany({
        where: { categoryName },
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
    name: string,
    categoryName: string,
  ): Promise<TechnicalSkillDto | null> {
    try {
      return await this.prismaService.technicalSkill.findUnique({
        where: {
          name_categoryName: { name, categoryName },
        },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async update(
    name: string,
    categoryName: string,
    updateTechnicalSkillDto: UpdateTechnicalSkillDto,
  ): Promise<TechnicalSkillDto> {
    try {
      return await this.prismaService.technicalSkill.update({
        where: {
          name_categoryName: { name, categoryName },
        },
        data: updateTechnicalSkillDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no technical skill with the given \`name\` (${name})`,
            { cause: error },
          );
        } else if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the \`name\` to \`${updateTechnicalSkillDto.name}\`, there already exists a technical skill with the given \`name\` (${updateTechnicalSkillDto.name}) for the \`categoryName\`: ${updateTechnicalSkillDto.categoryName}`,
            
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(
    name: string,
    categoryName: string,
  ): Promise<TechnicalSkillDto> {
    try {
      return await this.prismaService.technicalSkill.delete({
        where: {
          name_categoryName: { name, categoryName },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no technical skill with the given \`name\` (${name}) for the given \`categoryName\` (${categoryName}) `,
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
