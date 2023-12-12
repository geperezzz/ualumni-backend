import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AlumniModule } from 'src/alumni/alumni.module';

@Module({
  imports: [PrismaModule, AlumniModule],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
