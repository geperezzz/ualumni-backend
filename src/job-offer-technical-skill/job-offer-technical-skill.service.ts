import { Injectable } from '@nestjs/common';
import { CreateJobOfferTechnicalSkillDto } from './dto/create-job-offer-technical-skill.dto';
import { UpdateJobOfferTechnicalSkillDto } from './dto/update-job-offer-technical-skill.dto';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';
import { JobOfferTechnicalSkillDto } from './dto/job-offer-technical-skill.dto';
import { Prisma } from 'prisma/ualumni/client';
import {
  AlreadyExistsError,
  ForeignKeyError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { PageDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class JobOfferTechnicalSkillService {
  constructor(private readonly ualumniDbService: UalumniDbService) {}

  async create(
    jobOfferId: string,
    createJobOfferTechnicalSkillDto: CreateJobOfferTechnicalSkillDto,
  ): Promise<JobOfferTechnicalSkillDto> {
    try {
      return await this.ualumniDbService.jobOfferTechnicalSkill.create({
        data: {
          jobOfferId,
          technicalSkillCategoryName:
            createJobOfferTechnicalSkillDto.skillCategoryName,
          technicalSkillName: createJobOfferTechnicalSkillDto.skillName,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new AlreadyExistsError(
            `There already exists a technical skill with the given \`skillName\` (${createJobOfferTechnicalSkillDto.skillName}) for the job offer with \`id\` (${jobOfferId})`,
            { cause: error },
          );
        }
        if (error.code === 'P2003') {
          throw new ForeignKeyError(
            `There is no job offer with the given \`id\` (${jobOfferId})`,
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
    jobOfferId: string,
    page: number,
    perPage: number,
  ): Promise<PageDto<JobOfferTechnicalSkillDto>> {
    try {
      const totalCount =
        await this.ualumniDbService.jobOfferTechnicalSkill.count({
          where: {
            jobOfferId,
          },
        });
      const pageCount = Math.ceil(totalCount / perPage);

      if (page < 1) {
        page = 1;
      } else if (page > pageCount && pageCount > 0) {
        page = pageCount;
      }

      const data = await this.ualumniDbService.jobOfferTechnicalSkill.findMany({
        where: {
          jobOfferId,
        },
        take: perPage,
        skip: (page - 1) * perPage,
      });
      return {
        page,
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
    jobOfferId: string,
    skillCategoryName: string,
    skillName: string,
  ): Promise<JobOfferTechnicalSkillDto | null> {
    try {
      return await this.ualumniDbService.jobOfferTechnicalSkill.findUnique({
        where: {
          jobOfferId_technicalSkillName_technicalSkillCategoryName: {
            jobOfferId,
            technicalSkillCategoryName: skillCategoryName,
            technicalSkillName: skillName,
          },
        },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  update(id: number, updateJobOfferTechnicalSkillDto: UpdateJobOfferTechnicalSkillDto) {
    return `This action updates a #${id} jobOfferTechnicalSkill`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobOfferTechnicalSkill`;
  }
}
