import { Module } from '@nestjs/common';
import { ResumeCiapCoursesService } from './resume-ciap-courses.service';
import { ResumeCiapCoursesController } from './resume-ciap-courses.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';

@Module({
  imports: [UalumniDbModule],
  controllers: [ResumeCiapCoursesController],
  providers: [ResumeCiapCoursesService],
})
export class ResumeCiapCoursesModule {}
