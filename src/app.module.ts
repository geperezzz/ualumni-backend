import { Module } from '@nestjs/common';
import { SoftSkillsModule } from './soft-skills/soft-skills.module';
import { AlumniModule } from './alumni/alumni.module';
import { JobApplicationsModule } from './job-applications/job-applications.module';
import { JobOffersModule } from './job-offers/job-offers.module';
import { GraduationsModule } from './graduations/graduations.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
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
import { PrismaModule } from './prisma/prisma.module';
import { PortfolioItemModule } from './portfolio-item/portfolio-item.module';
import { ResumeLanguageModule } from './resume-language/resume-language.module';
import { ResumeTechnicalSkillModule } from './resume-technical-skill/resume-technical-skill.module';

@Module({
  imports: [
    SoftSkillsModule,
    AlumniModule,
    JobApplicationsModule,
    JobOffersModule,
    GraduationsModule,
    AuthModule,
    PermissionsModule,
    ConfigModule.forRoot(),
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
    PrismaModule,
    PortfolioItemModule,
    ResumeLanguageModule,
    ResumeTechnicalSkillModule,
  ],
})
export class AppModule {}
