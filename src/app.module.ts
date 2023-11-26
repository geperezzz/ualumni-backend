import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
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

@Module({
  imports: [
    PrismaModule,
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
  ],
})
export class AppModule {}
