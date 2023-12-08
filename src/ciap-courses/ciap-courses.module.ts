import { Module } from '@nestjs/common';
import { CiapCoursesService } from './ciap-courses.service';
import { CiapCoursesController } from './ciap-courses.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';

@Module({
  imports: [UalumniDbModule],
  controllers: [CiapCoursesController],
  providers: [CiapCoursesService],
})
export class CiapCoursesModule {}
