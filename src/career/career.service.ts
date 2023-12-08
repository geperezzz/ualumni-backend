import { Injectable } from '@nestjs/common';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { CareerDto } from './dto/career.dto';
import { PageDto } from 'src/common/dto/paginated-response.dto';
import { Prisma } from 'prisma/ualumni/client';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';

@Injectable()
export class CareerService {
  constructor(private readonly ualumniBdService: UalumniDbService) {}

  async create(createCareerDto: CreateCareerDto): Promise<CareerDto> {
    try {
      return await this.ualumniBdService.career.create({
        data: {
          name: createCareerDto.name,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a career with the given \`name\` (${createCareerDto.name})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findMany(page: number, perPage: number): Promise<PageDto<CareerDto>> {
    try {
      const totalCount = await this.ualumniBdService.career.count();
      const pageCount = Math.ceil(totalCount / perPage);

      if (page < 1) {
        page = 1;
      } else if (page > pageCount && pageCount > 0) {
        page = pageCount;
      }

      const data = await this.ualumniBdService.career.findMany({
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

  async findOne(name: string): Promise<CareerDto | null> {
    try {
      return await this.ualumniBdService.career.findUnique({
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
    updateCareerDto: UpdateCareerDto,
  ): Promise<CareerDto> {
    try {
      return await this.ualumniBdService.career.update({
        where: {
          name,
        },
        data: {
          name: updateCareerDto.name,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no career with the given \`name\` (${name})`,
            { cause: error },
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the \`name\` to \`${updateCareerDto.name}\`,there already exists a career with the given \`name\` (${updateCareerDto.name})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(name: string): Promise<CareerDto> {
    try {
      return await this.ualumniBdService.career.delete({
        where: {
          name,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no career with the given \`name\` (${name})`,
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
