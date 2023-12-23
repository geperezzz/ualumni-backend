import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UpdateResumeDto } from './dto/update-resume.dto';
import {
  NotFoundError,
  UnexpectedError,
} from 'src/common/errors/service.error';
import { Prisma } from 'prisma/ualumni/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Resume } from './resume.type';
import * as path from 'path';
import * as pug from 'pug';
import puppeteer from 'puppeteer';
import { AlumniService } from 'src/alumni/alumni.service';
import { UalumniDbService } from 'src/ualumni-db/ualumni-db.service';
import { MailingService } from 'src/mailing/mailing.service';

@Injectable()
export class ResumeService {
  constructor(
    @Inject(forwardRef(() => MailingService))
    private readonly mailingService: MailingService,
    private readonly ualumniDbService: UalumniDbService,
    private readonly alumniService: AlumniService,
  ) {}

  private buildResumeAsHtml = pug.compileFile(
    path.resolve(__dirname, 'templates/resume.pug'),
  );

  async exportAsPdf(email: string): Promise<Buffer> {
    const alumni =
      await this.alumniService.findOneWithResumeOnlyVisibles(email);
    if (!alumni) {
      throw new NotFoundError(
        `There is no alumni with the given \`email\` (${email})`,
      );
    }
    const browser = await puppeteer.launch({ headless: 'new' });

    const resumePage = await browser.newPage();
    await resumePage.setContent(this.buildResumeAsHtml({ alumni }), {
      waitUntil: 'networkidle0',
    });
    const pdf = await resumePage.pdf();

    await browser.close();
    await this.ualumniDbService.resume.update({
      where: { ownerEmail: email },
      data: { numberOfDownloads: { increment: 1 } },
    });
    return pdf;
  }

  async update(
    email: string,
    updateResumeDto: UpdateResumeDto,
  ): Promise<Resume> {
    try {
      const resume = await this.ualumniDbService.resume.update({
        where: { ownerEmail: email },
        data: {
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
          reminderSent: true,
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
          workExperiences: {
            select: {
              number: true,
              description: true,
              companyName: true,
              position: true,
              startDate: true,
              endDate: true,
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
        reminderSent: resume.reminderSent,
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
        workExperiences: resume.workExperiences,
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

  // automatic hiding of resumes older than a month
  @Cron(CronExpression.EVERY_12_HOURS)
  async hide() {
    //calculate a month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // update resume.visibleSince older than a month
    const resumes = await this.ualumniDbService.resume.updateMany({
      where: { visibleSince: { lte: oneMonthAgo } },
      data: { isVisible: false },
    });
  }

  // send visibility reminder a week before hiding
  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async sendReminder() {
    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() - 21);

    const alumniForReminder = await this.ualumniDbService.resume.findMany({
      where: {
        visibleSince: { lte: reminderDate },
        isVisible: true,
        reminderSent: false,
      },
    });

    for (let alumni of alumniForReminder) {
      const sentEmail = await this.mailingService.sendResumeVisibilityReminder(
        alumni.ownerEmail,
      );
      await this.ualumniDbService.resume.update({
        where: { ownerEmail: alumni.ownerEmail },
        data: { reminderSent: true },
      });
    }
  }
}
