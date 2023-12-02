import { Module } from '@nestjs/common';
import { CiapCoursesService } from './ciap-courses.service';
import { CiapCoursesController } from './ciap-courses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CiapCoursesController],
  providers: [CiapCoursesService],
})
export class CiapCoursesModule {}
