import { Module } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { JobApplicationsController } from './job-applications.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AlumniModule } from 'src/alumni/alumni.module';
import { JobOffersModule } from 'src/job-offers/job-offers.module';
import { ResumeModule } from 'src/resume/resume.module';

@Module({
  imports: [
    UalumniDbModule,
    AlumniModule,
    JobOffersModule,
    ResumeModule
  ],
  controllers: [JobApplicationsController],
  providers: [JobApplicationsService],
})
export class JobApplicationsModule {}
