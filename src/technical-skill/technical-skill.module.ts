import { Module } from '@nestjs/common';
import { TechnicalSkillService } from './technical-skill.service';
import { TechnicalSkillController } from './technical-skill.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TechnicalSkillController],
  providers: [TechnicalSkillService],
})
export class TechnicalSkillModule {}
