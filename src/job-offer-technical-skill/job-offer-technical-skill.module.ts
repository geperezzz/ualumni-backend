import { Module } from '@nestjs/common';
import { JobOfferTechnicalSkillService } from './job-offer-technical-skill.service';
import { JobOfferTechnicalSkillController } from './job-offer-technical-skill.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';

@Module({
  imports: [UalumniDbModule],
  controllers: [JobOfferTechnicalSkillController],
  providers: [JobOfferTechnicalSkillService],
})
export class JobOfferTechnicalSkillModule {}
