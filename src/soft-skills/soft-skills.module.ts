import { Module } from '@nestjs/common';
import { SoftSkillsService } from './soft-skills.service';
import { SoftSkillsController } from './soft-skills.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SoftSkillsController],
  providers: [SoftSkillsService],
})
export class SoftSkillsModule {}
