import { Module } from '@nestjs/common';
import { CareerService } from './career.service';
import { CareerController } from './career.controller';
import { PrismaModule } from 'src/ualumni-database/ualumni-database.module';

@Module({
  imports: [PrismaModule],
  controllers: [CareerController],
  providers: [CareerService],
})
export class CareerModule {}
