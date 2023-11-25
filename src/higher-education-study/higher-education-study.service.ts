import { Injectable } from '@nestjs/common';
import { CreateHigherEducationStudyDto } from './dto/create-higher-education-study.dto';
import { UpdateHigherEducationStudyDto } from './dto/update-higher-education-study.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HigherEducationStudyService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createHigherEducationStudyDto: CreateHigherEducationStudyDto) {
    try {
      const higherEducationStudy = await this.prismaService.higherEducationStudy.create(
        {
          data: {
            resumeId: createHigherEducationStudyDto.resumeId,
            title: createHigherEducationStudyDto.title,
            institution: createHigherEducationStudyDto.institution,
            startDate: createHigherEducationStudyDto.startDate,
            endDate: createHigherEducationStudyDto.endDate,
          },
        },
      );
      return higherEducationStudy;
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll(page: number, perPage: number) {
    return `This action returns all higherEducationStudy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} higherEducationStudy`;
  }

  update(
    id: number,
    updateHigherEducationStudyDto: UpdateHigherEducationStudyDto,
  ) {
    return `This action updates a #${id} higherEducationStudy`;
  }

  remove(id: number) {
    return `This action removes a #${id} higherEducationStudy`;
  }
}
