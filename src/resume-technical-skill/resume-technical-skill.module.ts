import { Module } from '@nestjs/common';
import { ResumeTechnicalSkillService } from './resume-technical-skill.service';
import { ResumeTechnicalSkillController } from './resume-technical-skill.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ResumeTechnicalSkillController],
  providers: [ResumeTechnicalSkillService],
})
export class ResumeTechnicalSkillModule {}
