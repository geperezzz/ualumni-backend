import { Module } from '@nestjs/common';
import { HigherEducationStudyService } from './higher-education-study.service';
import { HigherEducationStudyController } from './higher-education-study.controller';

@Module({
  controllers: [HigherEducationStudyController],
  providers: [HigherEducationStudyService],
})
export class HigherEducationStudyModule {}
