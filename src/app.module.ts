import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LanguageModule } from './language/language.module';
import { CareerModule } from './career/career.module';

@Module({
  imports: [PrismaModule, LanguageModule, CareerModule],
})
export class AppModule {}
