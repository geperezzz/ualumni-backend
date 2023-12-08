import { Module } from '@nestjs/common';
import { HigherEducationStudyService } from './higher-education-study.service';
import { HigherEducationStudyController } from './higher-education-study.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';

@Module({
  imports: [UalumniDbModule],
  controllers: [HigherEducationStudyController],
  providers: [HigherEducationStudyService],
})
export class HigherEducationStudyModule {}
