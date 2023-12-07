import { Module } from '@nestjs/common';
import { ResumeLanguageService } from './resume-language.service';
import { ResumeLanguageController } from './resume-language.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';

@Module({
  imports: [UalumniDbModule],
  controllers: [ResumeLanguageController],
  providers: [ResumeLanguageService],
})
export class ResumeLanguageModule {}
