import { Module } from '@nestjs/common';
import { PositionOfInterestService } from './position-of-interest.service';
import { PositionOfInterestController } from './position-of-interest.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';

@Module({
  imports: [UalumniDbModule],
  controllers: [PositionOfInterestController],
  providers: [PositionOfInterestService],
})
export class PositionOfInterestModule {}
