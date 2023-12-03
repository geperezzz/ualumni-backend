import { Module } from '@nestjs/common';
import { HigherEducationStudyService } from './higher-education-study.service';
import { HigherEducationStudyController } from './higher-education-study.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HigherEducationStudyController],
  providers: [HigherEducationStudyService],
})
export class HigherEducationStudyModule {}
