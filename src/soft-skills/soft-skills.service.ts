import { Injectable } from '@nestjs/common';
import { Prisma, SoftSkill } from '../../prisma/ualumni/client';
import { CreateSoftSkillDto } from './dto/create-soft-skill.dto';
import { UpdateSoftSkillDto } from './dto/update-soft-skill.dto';
import {
  AlreadyExistsError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { PaginationParamsDto } from 'src/common/dto/pagination-params.dto';
import { Page } from 'src/common/interfaces/page.interface';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';

@Injectable()
export class SoftSkillsService {
  constructor(private ualumniDbService: UalumniDbService) {}

  async create(createSoftSkillDto: CreateSoftSkillDto): Promise<SoftSkill> {
    try {
      return await this.ualumniDbService.softSkill.create({
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

  async findPage({
    pageNumber,
    itemsPerPage,
  }: PaginationParamsDto): Promise<Page<SoftSkill>> {
    try {
      let [items, numberOfItems] = await this.ualumniDbService.$transaction([
        this.ualumniDbService.softSkill.findMany({
          take: itemsPerPage,
          skip: itemsPerPage * (pageNumber - 1),
        }),
        this.ualumniDbService.softSkill.count(),
      ]);

      return {
        items,
        meta: {
          pageNumber,
          itemsPerPage,
          numberOfItems,
          numberOfPages: Math.ceil(numberOfItems / itemsPerPage),
        },
      };
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async findOne(name: string): Promise<SoftSkill | null> {
    try {
      return await this.ualumniDbService.softSkill.findFirst({
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
      return await this.ualumniDbService.softSkill.update({
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
      return await this.ualumniDbService.softSkill.delete({
        where: { name },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
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
