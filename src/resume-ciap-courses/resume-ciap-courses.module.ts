import { Module } from '@nestjs/common';
import { ResumeCiapCoursesService } from './resume-ciap-courses.service';
import { ResumeCiapCoursesController } from './resume-ciap-courses.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';
import { UcabDbModule } from 'src/ucab-db/ucab-db.module';

@Module({
  imports: [UalumniDbModule, UcabDbModule],
  controllers: [ResumeCiapCoursesController],
  providers: [ResumeCiapCoursesService],
})
export class ResumeCiapCoursesModule {}
