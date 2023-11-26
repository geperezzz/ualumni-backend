import { Module } from '@nestjs/common';
import { SoftSkillsModule } from './soft-skills/soft-skills.module';
import { AlumniModule } from './alumni/alumni.module';
import { JobApplicationsModule } from './job-applications/job-applications.module';
import { JobOffersModule } from './job-offers/job-offers.module';
import { GraduationsModule } from './graduations/graduations.module';

@Module({
  imports: [
    SoftSkillsModule,
    AlumniModule,
    JobApplicationsModule,
    JobOffersModule,
    GraduationsModule,
  ],
})
export class AppModule {}
