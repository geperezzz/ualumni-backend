import { Module } from '@nestjs/common';
import { SoftSkillsModule } from './soft-skills/soft-skills.module';
import { AlumniModule } from './alumni/alumni.module';

@Module({
  imports: [SoftSkillsModule, AlumniModule],
})
export class AppModule {}
