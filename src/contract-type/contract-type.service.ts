import { Injectable } from '@nestjs/common';
import { ContractTypeDto } from './dto/contract-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContractTypeDto } from './dto/create-contract-type.dto';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/error/service.error';
import { Prisma } from '@prisma/client';
import { PageDto } from 'src/common/dto/paginated-response.dto';
import { UpdateContractTypeDto } from './dto/update-contract-type.dto';

@Injectable()
export class ContractTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createContractTypeDto: CreateContractTypeDto,
  ): Promise<ContractTypeDto> {
    try {
      return await this.prismaService.contractType.create({
        data: {
          name: createContractTypeDto.name,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a contract type with the given \`name\` (${createContractTypeDto.name})`,
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
  ): Promise<PageDto<ContractTypeDto>> {
    try {
      const totalCount = await this.prismaService.contractType.count();
      const pageCount = Math.ceil(totalCount / perPage);

      if (totalCount == 0 || page < 1) {
        page = 1;
      } else if (page > pageCount) {
        page = pageCount;
      }

      const data = await this.prismaService.contractType.findMany({
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

  async findOne(name: string): Promise<ContractTypeDto | null> {
    try {
      return await this.prismaService.contractType.findUnique({
        where: { name },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async update(
    name: string,
    updateContractTypeDto: UpdateContractTypeDto,
  ): Promise<ContractTypeDto> {
    try {
      return await this.prismaService.contractType.update({
        where: {
          name,
        },
        data: {
          name: updateContractTypeDto.name,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no contract type with the given \`name\` (${name})`,
            { cause: error },
          );
        } else if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the \`name\` to \`${updateContractTypeDto.name}\`, there already exists a contract type with the given \`name\` (${updateContractTypeDto.name})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(name: string): Promise<ContractTypeDto> {
    try {
      return await this.prismaService.contractType.delete({
        where: {
          name,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no contract type with the given \`name\` (${name})`,
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
