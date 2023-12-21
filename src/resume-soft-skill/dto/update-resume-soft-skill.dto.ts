import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateResumeSoftSkillDto {
  @IsOptional()
  @IsString()
  skillName?: string;

  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;
}
