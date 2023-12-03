import { Module } from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { JobApplicationsController } from './job-applications.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JobApplicationsController],
  providers: [JobApplicationsService],
})
export class JobApplicationsModule {}
