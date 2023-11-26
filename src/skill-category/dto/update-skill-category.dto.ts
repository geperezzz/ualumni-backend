import { IsOptional, IsString } from 'class-validator';

export class UpdateSkillCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;
}
