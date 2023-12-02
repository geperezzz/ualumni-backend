import { Module } from '@nestjs/common';
import { ResumeCiapCoursesService } from './resume-ciap-courses.service';
import { ResumeCiapCoursesController } from './resume-ciap-courses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ResumeCiapCoursesController],
  providers: [ResumeCiapCoursesService],
})
export class ResumeCiapCoursesModule {}
