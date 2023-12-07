import { Module } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { JobApplicationsController } from './job-applications.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';

@Module({
  imports: [UalumniDbModule],
  controllers: [JobApplicationsController],
  providers: [JobApplicationsService],
})
export class JobApplicationsModule {}
