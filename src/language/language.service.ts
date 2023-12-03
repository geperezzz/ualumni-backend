import { Injectable } from '@nestjs/common';
import { LanguageDto } from './dto/language.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PageDto } from 'src/common/dto/paginated-response.dto';
import { Prisma } from '@prisma/client';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/error/service.error';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Injectable()
export class LanguageService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createLanguageDto: CreateLanguageDto): Promise<LanguageDto> {
    try {
      return await this.prismaService.language.create({
        data: {
          name: createLanguageDto.name,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a language with the given \`name\` (${createLanguageDto.name})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findMany(page: number, perPage: number): Promise<PageDto<LanguageDto>> {
    try {
      const totalCount = await this.prismaService.language.count();
      const pageCount = Math.ceil(totalCount / perPage);

      if (page < 1) {
        page = 1;
      } else if (page > pageCount && pageCount > 0) {
        page = pageCount;
      }

      const data = await this.prismaService.language.findMany({
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

  async findOne(name: string): Promise<LanguageDto | null> {
    try {
      return await this.prismaService.language.findUnique({
        where: {
          name,
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
    updateLanguageDto: UpdateLanguageDto,
  ): Promise<LanguageDto> {
    try {
      return await this.prismaService.language.update({
        where: {
          name,
        },
        data: {
          name: updateLanguageDto.name,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no language with the given \`name\` (${name})`,
            { cause: error },
          );
        } else if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the \`name\` to \`${updateLanguageDto.name}\`, there already exists a language with the given \`name\` (${updateLanguageDto.name})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(name: string): Promise<LanguageDto> {
    try {
      return await this.prismaService.language.delete({
        where: {
          name,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no language with the given \`name\` (${name})`,
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
