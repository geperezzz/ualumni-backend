import {
    IsString,
    IsEmail,
    IsBoolean,
    IsOptional,
    IsDateString,
  } from 'class-validator';
  
  export class UpdateResumeTechnicalSkillDto {
    @IsEmail()
    @IsOptional()
    resumeOwnerEmail?: string;
  
   
    @IsOptional()
  @IsString()
  skillName: string;

  @IsOptional()
  @IsString()
  skillCategoryName: string;
  
  @IsOptional()
  @IsBoolean()
  isVisible: boolean;
  }