import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsEmail,
  IsBoolean,
} from 'class-validator';

export class CreateResumeTechnicalSkillDto {
  @IsNotEmpty()
  @IsString()
  skillName: string;

  @IsNotEmpty()
  @IsString()
  skillCategoryName: string;
  
  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;
}