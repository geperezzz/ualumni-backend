import { Module } from '@nestjs/common';
import { ResumeSoftSkillService } from './resume-soft-skill.service';
import { ResumeSoftSkillController } from './resume-soft-skill.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ResumeSoftSkillController],
  providers: [ResumeSoftSkillService],
})
export class ResumeSoftSkillModule {}
