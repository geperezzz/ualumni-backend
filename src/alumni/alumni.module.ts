import { Module } from '@nestjs/common';
import { AlumniService } from './alumni.service';
import { AlumniController } from './alumni.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';
import { UcabDbModule } from 'src/ucab-db/ucab-db.module';

@Module({
  imports: [UalumniDbModule, UcabDbModule],
  controllers: [AlumniController],
  providers: [AlumniService],
  exports: [AlumniService],
})
export class AlumniModule {}
