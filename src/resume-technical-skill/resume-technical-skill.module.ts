import { Module } from '@nestjs/common';
import { ResumeTechnicalSkillService } from './resume-technical-skill.service';
import { ResumeTechnicalSkillController } from './resume-technical-skill.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';

@Module({
  imports: [UalumniDbModule],
  controllers: [ResumeTechnicalSkillController],
  providers: [ResumeTechnicalSkillService],
})
export class ResumeTechnicalSkillModule {}
