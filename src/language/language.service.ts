import { Injectable } from '@nestjs/common';
import { LanguageDto } from './dto/language.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PageDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class LanguageService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(languageDto: LanguageDto): Promise<LanguageDto> {
    try {
      const language = await this.prismaService.language.create({
        data: {
          name: languageDto.name,
        },
      });
      return language;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(page: number, perPage: number): Promise<PageDto<LanguageDto>> {
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
      throw new Error(error);
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
      throw new Error(error);
    }
  }
}
