import { Module } from '@nestjs/common';
import { IndustryOfInterestService } from './industry-of-interest.service';
import { IndustryOfInterestController } from './industry-of-interest.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [IndustryOfInterestController],
  providers: [IndustryOfInterestService],
})
export class IndustryOfInterestModule {}
