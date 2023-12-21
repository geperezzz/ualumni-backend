import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateResumeSoftSkillDto {
  @IsNotEmpty()
  @IsString()
  skillName: string;

  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;
}
