import { Module } from '@nestjs/common';
import { JobOfferTechnicalSkillService } from './job-offer-technical-skill.service';
import { JobOfferTechnicalSkillController } from './job-offer-technical-skill.controller';

@Module({
  controllers: [JobOfferTechnicalSkillController],
  providers: [JobOfferTechnicalSkillService],
})
export class JobOfferTechnicalSkillModule {}
