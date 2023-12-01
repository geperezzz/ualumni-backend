import { Module } from '@nestjs/common';
import { SoftSkillsModule } from './soft-skills/soft-skills.module';
import { AlumniModule } from './alumni/alumni.module';
import { JobApplicationsModule } from './job-applications/job-applications.module';
import { JobOffersModule } from './job-offers/job-offers.module';
import { GraduationsModule } from './graduations/graduations.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [
    SoftSkillsModule,
    AlumniModule,
    JobApplicationsModule,
    JobOffersModule,
    GraduationsModule,
    AuthModule,
    PermissionsModule,
    ConfigModule.forRoot(),
    PermissionsModule,
  ],
})
export class AppModule {}
