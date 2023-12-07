import { Module } from '@nestjs/common';
import { ResumeLanguageService } from './resume-language.service';
import { ResumeLanguageController } from './resume-language.controller';
import { PrismaModule } from 'src/ualumni-database/ualumni-database.module';

@Module({
  imports: [PrismaModule],
  controllers: [ResumeLanguageController],
  providers: [ResumeLanguageService],
})
export class ResumeLanguageModule {}
