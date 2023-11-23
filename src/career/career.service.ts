import { Injectable } from '@nestjs/common';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { CareerDto } from './dto/career.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PageDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class CareerService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCareerDto: CreateCareerDto): Promise<CareerDto> {
    try {
      const career = await this.prismaService.career.create({
        data: {
          name: createCareerDto.name,
        },
      });
      return career;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(page: number, perPage: number): Promise<PageDto<CareerDto>> {
    try {
      const totalCount = await this.prismaService.career.count();
      const pageCount = Math.ceil(totalCount / perPage);

      if (page < 1) {
        page = 1;
      } else if (page > pageCount && pageCount > 0) {
        page = pageCount;
      }

      const data = await this.prismaService.career.findMany({
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

  async findOne(id: string): Promise<CareerDto> {
    try {
      const career = await this.prismaService.career.findUnique({
        where: {
          id,
        },
      });
      if (!career) throw new Error('Career not found');
      return career;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    id: string,
    updateCareerDto: UpdateCareerDto,
  ): Promise<CareerDto> {
    try {
      await this.findOne(id);
      const career = await this.prismaService.career.update({
        where: {
          id,
        },
        data: {
          name: updateCareerDto.name,
        },
      });
      return career;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: string): Promise<CareerDto> {
    try {
      await this.findOne(id);
      const career = await this.prismaService.career.delete({
        where: {
          id,
        },
      });
      return career;
    } catch (error) {
      throw new Error(error);
    }
  }
}
