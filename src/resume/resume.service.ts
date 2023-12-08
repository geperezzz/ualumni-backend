import { Injectable } from '@nestjs/common';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumeDto } from './dto/resume.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError, UnexpectedError } from 'src/common/error/service.error';
import { Prisma } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Resume } from './resume.type';

@Injectable()
export class ResumeService {
  constructor(private readonly prismaService: PrismaService) {}

  async update(
    email: string,
    updateResumeDto: UpdateResumeDto,
  ): Promise<Resume> {
    try {
      const resume = await this.prismaService.resume.update({
        where: { ownerEmail: email },
        data: {
          numberOfDownloads: updateResumeDto.numberOfDownloads,
          isVisible: updateResumeDto.isVisible,
          aboutMe: updateResumeDto.aboutMe,
          visibleSince: updateResumeDto.isVisible
            ? new Date().toISOString()
            : undefined,
        },
        select: {
          ownerEmail: true,
          numberOfDownloads: true,
          isVisible: true,
          visibleSince: true,
          aboutMe: true,
          ciapCourses: {
            select: {
              course: {
                select: {
                  id: true,
                  name: true,
                  date: true,
                },
              },
              isVisible: true,
            },
          },
          knownLanguages: {
            select: {
              languageName: true,
              masteryLevel: true,
              isVisible: true,
            },
          },
          technicalSkills: {
            select: {
              skillName: true,
              skillCategoryName: true,
              isVisible: true,
            },
          },
          higherEducationStudies: {
            select: {
              title: true,
              institution: true,
              endDate: true,
              isVisible: true,
            },
          },
          industriesOfInterest: {
            select: {
              industryName: true,
              isVisible: true,
            },
          },
          portfolio: {
            select: {
              title: true,
              isVisible: true,
              sourceLink: true,
            },
          },
          positionsOfInterest: {
            select: {
              positionName: true,
              isVisible: true,
            },
          },
          softSkills: {
            select: {
              skillName: true,
              isVisible: true,
            },
          },
        },
      });
      return {
        ownerEmail: resume.ownerEmail,
        numberOfDownloads: resume.numberOfDownloads,
        isVisible: resume.isVisible,
        visibleSince: resume.visibleSince,
        aboutMe: resume.aboutMe,
        ciapCourses: resume.ciapCourses.map((ciapCourse) => ({
          id: ciapCourse.course.id,
          name: ciapCourse.course.name,
          date: ciapCourse.course.date,
          isVisible: ciapCourse.isVisible,
        })),
        knownLanguages: resume.knownLanguages,
        technicalSkills: resume.technicalSkills,
        higherEducationStudies: resume.higherEducationStudies,
        industriesOfInterest: resume.industriesOfInterest,
        portfolio: resume.portfolio,
        positionsOfInterest: resume.positionsOfInterest,
        softSkills: resume.softSkills,
      };
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
  async hide() {
    //calculate a month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    //update resume.visibleSince older than a month
    const resumes = await this.prismaService.resume.updateMany({
      where: { visibleSince: { lte: oneMonthAgo } },
      data: { isVisible: false },
    });
  }
}
