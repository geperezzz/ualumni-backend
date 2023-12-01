import { Injectable, Logger } from '@nestjs/common';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumeDto } from './dto/resume.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError, UnexpectedError } from 'src/common/error/service.error';
import { Prisma } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ResumeService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string): Promise<ResumeDto | null> {
    try {
      return await this.prismaService.resume.findUnique({
        where: { ownerEmail: email },
        include: {
          knownLanguages: true,
          portfolio: true,
          higherEducationStudies: true,
          technicalSkills: true,
          softSkills: true,
          ciapCourses: true,
          positionsOfInterest: true,
          industriesOfInterest: true,
        },
      });
    } catch (error) {
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  async update(email: string, updateResumeDto: UpdateResumeDto) {
    try {
      return await this.prismaService.resume.update({
        where: { ownerEmail: email },
        data: {
          numberOfDownloads: updateResumeDto.numberOfDownloads,
          isVisible: updateResumeDto.isVisible,
          aboutMe: updateResumeDto.aboutMe,
          visibleSince: updateResumeDto.isVisible
            ? new Date().toISOString()
            : undefined,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundError(
            `There is no resume user with the given \`email\` (${email})`,
            { cause: error },
          );
        }
      }
      throw new UnexpectedError('An unexpected situation ocurred', {
        cause: error,
      });
    }
  }

  //automatic hiding of resumes older than a month
  @Cron(CronExpression.EVERY_12_HOURS)
  async handleCron() {
    //calculate a month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    //update resume.isVisible older than a month
    const resumes = await this.prismaService.resume.updateMany({
      where: { visibleSince: { lte: oneMonthAgo } },
      data: { isVisible: false },
    });
  }
}
