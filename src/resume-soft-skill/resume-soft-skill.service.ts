import { Injectable } from '@nestjs/common';
import { CreateResumeSoftSkillDto } from './dto/create-resume-soft-skill.dto';
import { UpdateResumeSoftSkillDto } from './dto/update-resume-soft-skill.dto';
import {
  AlreadyExistsError,
  ForeignKeyError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { Prisma } from '../../prisma/ualumni/client';
import { ResumeSoftSkillDto } from './dto/resume-soft-skill.dto';
import { PageDto } from 'src/common/dto/paginated-response.dto';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';

@Injectable()
export class ResumeSoftSkillService {
  constructor(private readonly ualumniDbService: UalumniDbService) {}

  async create(
    resumeOwnerEmail: string,
    createResumeSoftSkillDto: CreateResumeSoftSkillDto,
  ) {
    try {
      return await this.ualumniDbService.resumeSoftSkill.create({
        data: {
          resumeOwnerEmail: resumeOwnerEmail,
          skillName: createResumeSoftSkillDto.skillName,
          isVisible: createResumeSoftSkillDto.isVisible,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a resume soft skill with the given \`skillName\` (${createResumeSoftSkillDto.skillName}) for the given \`resumeOwnerEmail\` (${resumeOwnerEmail})`,
            { cause: error },
          );
        }
        if (error.code === 'P2003') {
          throw new ForeignKeyError(
            `There is no user with the given \`${resumeOwnerEmail}\` (${resumeOwnerEmail}) or there is no soft skill with the given \`skillName\` (${createResumeSoftSkillDto.skillName})`,
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
    resumeOwnerEmail: string,
    page: number,
    perPage: number,
  ): Promise<PageDto<ResumeSoftSkillDto>> {
    try {
      const totalCount = await this.ualumniDbService.resumeSoftSkill.count({
        where: { resumeOwnerEmail },
      });
      const pageCount = Math.ceil(totalCount / perPage);

      if (page < 1) {
        page = 1;
      } else if (page > pageCount && pageCount > 0) {
        page = pageCount;
      }

      const data = await this.ualumniDbService.resumeSoftSkill.findMany({
        where: { resumeOwnerEmail },
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
    skillName: string,
    resumeOwnerEmail: string,
  ): Promise<ResumeSoftSkillDto | null> {
    try {
      return await this.ualumniDbService.resumeSoftSkill.findUnique({
        where: {
          resumeOwnerEmail_skillName: {
            skillName,
            resumeOwnerEmail,
          },
        },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async update(
    skillName: string,
    resumeOwnerEmail: string,
    updateResumeSoftSkillDto: UpdateResumeSoftSkillDto,
  ): Promise<ResumeSoftSkillDto> {
    try {
      return await this.ualumniDbService.resumeSoftSkill.update({
        where: {
          resumeOwnerEmail_skillName: {
            skillName,
            resumeOwnerEmail,
          },
        },
        data: updateResumeSoftSkillDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no resume soft skill with the given \`skillName\` (${skillName}) for the given \`resumeOwnerEmail\` (${resumeOwnerEmail})`,
            { cause: error },
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the resume soft skill, there already exists a resume soft skill with the given \`title\` (${updateResumeSoftSkillDto.skillName}) for the given \`resumeOwnerEmail\` (${resumeOwnerEmail})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async remove(
    skillName: string,
    resumeOwnerEmail: string,
  ): Promise<ResumeSoftSkillDto> {
    try {
      return await this.ualumniDbService.resumeSoftSkill.delete({
        where: {
          resumeOwnerEmail_skillName: {
            skillName,
            resumeOwnerEmail,
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no resume soft skill with the given \`skillName\` (${skillName}) for the given \`resumeOwnerEmail\` (${resumeOwnerEmail})`,
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
