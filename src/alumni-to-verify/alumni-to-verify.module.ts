import { Module } from '@nestjs/common';
import { AlumniToVerifyService } from './alumni-to-verify.service';
import { AlumniToVerifyController } from './alumni-to-verify.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';
import { UcabDbModule } from 'src/ucab-db/ucab-db.module';
import { AlumniService } from 'src/alumni/alumni.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    UalumniDbModule,
    UcabDbModule
  ],
  controllers: [AlumniToVerifyController],
  providers: [AlumniToVerifyService, AlumniService],
  exports: [AlumniToVerifyService]
})
export class AlumniToVerifyModule {}
