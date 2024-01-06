import { Module } from '@nestjs/common';
import { AlumniToVerifyService } from './alumni-to-verify.service';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';
import { UcabDbModule } from 'src/ucab-db/ucab-db.module';
import { ConfigModule } from '@nestjs/config';
import { AlumniModule } from 'src/alumni/alumni.module';

@Module({
  imports: [AlumniModule, UalumniDbModule, UcabDbModule, ConfigModule],
  providers: [AlumniToVerifyService],
  exports: [AlumniToVerifyService],
})
export class AlumniToVerifyModule {}
