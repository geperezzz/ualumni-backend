import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PortfolioItemModule } from './portfolio-item/portfolio-item.module';
import { ResumeLanguageModule } from './resume-language/resume-language.module';
import { ResumeTechnicalSkillModule } from './resume-technical-skill/resume-technical-skill.module';

@Module({
  imports: [
    PrismaModule,
    PortfolioItemModule,
    ResumeLanguageModule,
    ResumeTechnicalSkillModule,

  ],
})
export class AppModule {}
