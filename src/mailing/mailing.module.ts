import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailingController } from './mailing.controller';
import { ResumeService } from 'src/resume/resume.service';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';
import { AlumniModule } from 'src/alumni/alumni.module';

@Module({
  imports: [UalumniDbModule, AlumniModule],
  controllers: [MailingController],
  providers: [MailingService, ResumeService],
})
export class MailingModule {}
