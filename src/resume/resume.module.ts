import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';
import { AlumniModule } from 'src/alumni/alumni.module';
import { MailingModule } from 'src/mailing/mailing.module';

@Module({
  imports: [MailingModule, UalumniDbModule, AlumniModule],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
