import { Injectable } from '@nestjs/common';
import { CreateResumeTechnicalSkillDto } from './dto/create-resume-technical-skill.dto';
import { UpdateResumeTechnicalSkillDto } from './dto/update-resume-technical-skill.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  AlreadyExistsError,
  ForeignKeyError,
  NotFoundError,
  UnexpectedError,
} from 'src/common/error/service.error';
import { ResumeTechnicalSkillDto } from './dto/resume-technical-skill.dto';
import { PageDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class ResumeTechnicalSkillService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    resumeOwnerEmail: string,
    createResumeTechnicalSkillDto: CreateResumeTechnicalSkillDto,
  ): Promise<ResumeTechnicalSkillDto> {
    try {
      return await this.prismaService.resumeTechnicalSkill.create({
        data: {
          resumeOwnerEmail: resumeOwnerEmail,
          skillCategoryName: createResumeTechnicalSkillDto.skillCategoryName,
          skillName: createResumeTechnicalSkillDto.skillName,
          isVisible: createResumeTechnicalSkillDto.isVisible,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a technical skill with the given \`skillName\` (${createResumeTechnicalSkillDto.skillName}) for the user \`email\` (${resumeOwnerEmail})`,
            { cause: error },
          );
        }
        if (error.code === 'P2003') {
          throw new ForeignKeyError(
            `There is no user with the given \`email\` (${resumeOwnerEmail})`,
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
  ): Promise<PageDto<ResumeTechnicalSkillDto>> {
    try {
      const totalCount = await this.prismaService.resumeTechnicalSkill.count({
        where: { resumeOwnerEmail },
      });
      const pageCount = Math.ceil(totalCount / perPage);

      if (page < 1) {
        page = 1;
      } else if (page > pageCount && pageCount > 0) {
        page = pageCount;
      }

      const data = await this.prismaService.resumeTechnicalSkill.findMany({
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
    resumeOwnerEmail: string,
    skillCategoryName: string,
    skillName: string,
  ): Promise<ResumeTechnicalSkillDto | null> {
    try {
      return await this.prismaService.resumeTechnicalSkill.findUnique({
        where: {
          resumeOwnerEmail_skillName_skillCategoryName: {
            skillName,
            resumeOwnerEmail,
            skillCategoryName,
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
    resumeOwnerEmail: string,
    skillCategoryName: string,
    skillName: string,
    updateResumeTechnicalSkillDto: UpdateResumeTechnicalSkillDto,
  ): Promise<ResumeTechnicalSkillDto> {
    try {
      return await this.prismaService.resumeTechnicalSkill.update({
        where: {
          resumeOwnerEmail_skillName_skillCategoryName: {
            skillName,
            resumeOwnerEmail,
            skillCategoryName,
          },
        },
        data: updateResumeTechnicalSkillDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no technical skill with the given \`skillName\` (${skillName})`,
            { cause: error },
          );
        }
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `Cannot update the technicall skill, there already exists a technicall skill with the given \`skillName\` (${updateResumeTechnicalSkillDto.skillName}) for the user \`email\` (${resumeOwnerEmail})`,
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
    resumeOwnerEmail: string,
    skillCategoryName: string,
    skillName: string,
  ): Promise<ResumeTechnicalSkillDto> {
    try {
      return await this.prismaService.resumeTechnicalSkill.delete({
        where: {
          resumeOwnerEmail_skillName_skillCategoryName: {
            resumeOwnerEmail,
            skillName,
            skillCategoryName,
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no technical skill with the given \`skillName\` (${skillName})`,
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
