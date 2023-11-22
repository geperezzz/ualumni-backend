import { Injectable } from '@nestjs/common';
import { ContractTypeDto } from './dto/contract-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContractTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(contractTypeDto: ContractTypeDto): Promise<ContractTypeDto> {
    try {
      const contractType = await this.prismaService.contractType.create({
        data: {
          name: contractTypeDto.name,
        },
      });
      return contractType;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(page: number, perPage: number) {
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
      throw new Error(error);
    }
  }

  async findOne(name: string): Promise<ContractTypeDto> {
    try {
      const contractType = await this.prismaService.contractType.findUnique({
        where: { name },
      });
      if (!contractType) throw new Error('Contract type not found');
      return contractType;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(name: string) {
    try {
      return await this.prismaService.contractType.delete({
        where: {
          name,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
