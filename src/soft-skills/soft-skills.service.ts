import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, SoftSkill } from '@prisma/client';
import { CreateSoftSkillDto } from './dto/create-soft-skill.dto';
import { UpdateSoftSkillDto } from './dto/update-soft-skill.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/error/service.error';

@Injectable()
export class SoftSkillsService {
  constructor(private prismaService: PrismaService) {}

  async create(createSoftSkillDto: CreateSoftSkillDto): Promise<SoftSkill> {
    try {
      return await this.prismaService.softSkill.create({
        data: createSoftSkillDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a soft skill with the given \`name\` (${createSoftSkillDto.name})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findAll(): Promise<SoftSkill[]> {
    try {
      return await this.prismaService.softSkill.findMany();
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findOne(name: string): Promise<SoftSkill | null> {
    try {
      return await this.prismaService.softSkill.findFirst({
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
    updateSoftSkillDto: UpdateSoftSkillDto,
  ): Promise<SoftSkill> {
    try {
      return await this.prismaService.softSkill.update({
        where: { name },
        data: updateSoftSkillDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no soft skill with the given \`name\` (${name})`,
            { cause: error },
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the \`name\` to \`${updateSoftSkillDto.name}\`, there already exists a soft skill with the same \`name\``,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(name: string): Promise<SoftSkill> {
    try {
      return await this.prismaService.softSkill.delete({
        where: { name },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2001') {
          throw new NotFoundError(
            `There is no soft skill with the given \`name\` (${name})`,
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
