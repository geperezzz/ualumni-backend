import { Module } from '@nestjs/common';
import { CiapCoursesService } from './ciap-courses.service';
import { CiapCoursesController } from './ciap-courses.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';
import { UcabDbModule } from 'src/ucab-db/ucab-db.module';

@Module({
  imports: [UalumniDbModule, UcabDbModule],
  controllers: [CiapCoursesController],
  providers: [CiapCoursesService],
})
export class CiapCoursesModule {}
