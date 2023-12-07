import { Module } from '@nestjs/common';
import { AlumniService } from './alumni.service';
import { AlumniController } from './alumni.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';

@Module({
  imports: [UalumniDbModule],
  controllers: [AlumniController],
  providers: [AlumniService],
  exports: [AlumniService],
})
export class AlumniModule {}
