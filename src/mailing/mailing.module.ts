import { Global, Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { ResumeService } from 'src/resume/resume.service';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';
import { AlumniModule } from 'src/alumni/alumni.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { JobOffersService } from 'src/job-offers/job-offers.service';
import { UcabDbModule } from 'src/ucab-db/ucab-db.module';

@Module({
  imports: [
    UcabDbModule,
    UalumniDbModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      template: {
        dir: join(__dirname, '/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UalumniDbModule,
    AlumniModule,
  ],
  providers: [MailingService, ResumeService, JobOffersService],
  exports: [MailingService],
})
export class MailingModule {}
