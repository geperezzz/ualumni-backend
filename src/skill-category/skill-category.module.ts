import { Module } from '@nestjs/common';
import { SkillCategoryService } from './skill-category.service';
import { SkillCategoryController } from './skill-category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SkillCategoryController],
  providers: [SkillCategoryService],
})
export class SkillCategoryModule {}
