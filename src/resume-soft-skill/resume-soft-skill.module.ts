import { Module } from '@nestjs/common';
import { ResumeSoftSkillService } from './resume-soft-skill.service';
import { ResumeSoftSkillController } from './resume-soft-skill.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';

@Module({
  imports: [UalumniDbModule],
  controllers: [ResumeSoftSkillController],
  providers: [ResumeSoftSkillService],
})
export class ResumeSoftSkillModule {}
