import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LanguageModule } from './language/language.module';
import { CareerModule } from './career/career.module';
import { ContractTypeModule } from './contract-type/contract-type.module';
import { HigherEducationStudyModule } from './higher-education-study/higher-education-study.module';

@Module({
  imports: [
    PrismaModule,
    LanguageModule,
    CareerModule,
    ContractTypeModule,
    HigherEducationStudyModule,
  ],
})
export class AppModule {}
