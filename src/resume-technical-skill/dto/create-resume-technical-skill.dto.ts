import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateResumeTechnicalSkillDto {
  @IsNotEmpty()
  @IsString()
  skillCategoryName: string;

  @IsNotEmpty()
  @IsString()
  skillName: string;

  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;
}
