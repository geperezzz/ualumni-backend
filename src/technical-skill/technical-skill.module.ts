import { Module } from '@nestjs/common';
import { TechnicalSkillService } from './technical-skill.service';
import { TechnicalSkillController } from './technical-skill.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';

@Module({
  imports: [UalumniDbModule],
  controllers: [TechnicalSkillController],
  providers: [TechnicalSkillService],
})
export class TechnicalSkillModule {}
