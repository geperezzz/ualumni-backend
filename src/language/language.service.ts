import { Injectable } from '@nestjs/common';
import { LanguageDto } from './dto/languageDto.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async findAll(page: number, perPage: number): Promise<any> {
    const totalCount = await this.prismaService.language.count();
    const pageCount = Math.ceil(totalCount / perPage);

    if (page < 1) {
      page = 1;
    } else if (page > pageCount) {
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
  }

  async remove(name: string) {
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
