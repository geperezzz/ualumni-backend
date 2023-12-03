import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateResumeTechnicalSkillDto {
  @IsNotEmpty()
  @IsString()
  skillName: string;

  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;
}
