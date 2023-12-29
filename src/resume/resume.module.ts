import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';
import { AlumniModule } from 'src/alumni/alumni.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    UalumniDbModule,
    AlumniModule
  ],
  controllers: [ResumeController],
  providers: [ResumeService],
  exports: [ResumeService]
})
export class ResumeModule {}
