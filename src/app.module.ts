import { Module } from '@nestjs/common';
import { SoftSkillsModule } from './soft-skills/soft-skills.module';
import { AlumniModule } from './alumni/alumni.module';
import { JobApplicationsModule } from './job-applications/job-applications.module';
import { JobOffersModule } from './job-offers/job-offers.module';
import { GraduationsModule } from './graduations/graduations.module';
import { AuthModule } from './auth/auth.module';
import { PermissionsModule } from './permissions/permissions.module';
import { LanguageModule } from './language/language.module';
import { CareerModule } from './career/career.module';
import { ContractTypeModule } from './contract-type/contract-type.module';
import { HigherEducationStudyModule } from './higher-education-study/higher-education-study.module';
import { CiapCoursesModule } from './ciap-courses/ciap-courses.module';
import { IndustryOfInterestModule } from './industry-of-interest/industry-of-interest.module';
import { ResumeModule } from './resume/resume.module';
import { TechnicalSkillModule } from './technical-skill/technical-skill.module';
import { SkillCategoryModule } from './skill-category/skill-category.module';
import { ResumeCiapCoursesModule } from './resume-ciap-courses/resume-ciap-courses.module';
import { ResumeSoftSkillModule } from './resume-soft-skill/resume-soft-skill.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UalumniDbModule } from './ualumni-db/ualumni-db.module';
import { PortfolioItemModule } from './portfolio-item/portfolio-item.module';
import { ResumeLanguageModule } from './resume-language/resume-language.module';
import { ResumeTechnicalSkillModule } from './resume-technical-skill/resume-technical-skill.module';
import { UcabDbModule } from './ucab-db/ucab-db.module';
import { WorkExperiencesModule } from './work-experiences/work-experiences.module';
import { PositionOfInterestModule } from './position-of-interest/position-of-interest.module';
import { AlumniToVerifyModule } from './alumni-to-verify/alumni-to-verify.module';
import { JobOfferTechnicalSkillModule } from './job-offer-technical-skill/job-offer-technical-skill.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    SoftSkillsModule,
    AlumniModule,
    JobOffersModule,
    GraduationsModule,
    AuthModule,
    PermissionsModule,
    PermissionsModule,
    ScheduleModule.forRoot(),
    LanguageModule,
    CareerModule,
    ContractTypeModule,
    HigherEducationStudyModule,
    CiapCoursesModule,
    IndustryOfInterestModule,
    ResumeModule,
    TechnicalSkillModule,
    SkillCategoryModule,
    ResumeCiapCoursesModule,
    ResumeSoftSkillModule,
    UalumniDbModule,
    PortfolioItemModule,
    ResumeLanguageModule,
    ResumeTechnicalSkillModule,
    UcabDbModule,
    WorkExperiencesModule,
    PositionOfInterestModule,
    AlumniToVerifyModule,
    JobApplicationsModule,
    JobOfferTechnicalSkillModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.getOrThrow('MAIL_HOST'),
          secure: false,
          auth: {
            user: configService.getOrThrow('MAIL_USER'),
            pass: configService.getOrThrow('MAIL_PASS'),
          },
        },
        template: {
          dir: join(__dirname, '/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
