import { Module } from '@nestjs/common';
import { AlumniToVerifyService } from './alumni-to-verify.service';
import { AlumniToVerifyController } from './alumni-to-verify.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';
import { UcabDbModule } from 'src/ucab-db/ucab-db.module';
import { AlumniService } from 'src/alumni/alumni.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UalumniDbModule, UcabDbModule, ConfigModule],
  controllers: [AlumniToVerifyController],
  providers: [AlumniToVerifyService, AlumniService],
  exports: [AlumniToVerifyService],
})
export class AlumniToVerifyModule {}
