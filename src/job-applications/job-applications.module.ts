import { Module } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { JobApplicationsController } from './job-applications.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';
import { MailingModule } from 'src/mailing/mailing.module';

@Module({
  imports: [UalumniDbModule, MailingModule],
  controllers: [JobApplicationsController],
  providers: [JobApplicationsService],
})
export class JobApplicationsModule {}
