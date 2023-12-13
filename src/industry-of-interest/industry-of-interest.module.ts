import { Module } from '@nestjs/common';
import { IndustryOfInterestService } from './industry-of-interest.service';
import { IndustryOfInterestController } from './industry-of-interest.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';

@Module({
  imports: [UalumniDbModule],
  controllers: [IndustryOfInterestController],
  providers: [IndustryOfInterestService],
})
export class IndustryOfInterestModule {}
