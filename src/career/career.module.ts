import { Module } from '@nestjs/common';
import { CareerService } from './career.service';
import { CareerController } from './career.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';
import { UcabDbModule } from 'src/ucab-db/ucab-db.module';

@Module({
  imports: [UalumniDbModule, UcabDbModule],
  controllers: [CareerController],
  providers: [CareerService],
})
export class CareerModule {}
