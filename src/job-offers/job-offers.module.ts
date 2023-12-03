import { Module } from '@nestjs/common';
import { JobOffersService } from './job-offers.service';
import { JobOffersController } from './job-offers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JobOffersController],
  providers: [JobOffersService],
})
export class JobOffersModule {}
