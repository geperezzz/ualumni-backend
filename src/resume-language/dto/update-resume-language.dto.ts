import {
    IsString,
    IsEmail,
    IsBoolean,
    IsOptional,
    IsDateString,
  } from 'class-validator';
  
  export class UpdateResumeLanguageDto {
    @IsEmail()
    @IsOptional()
    resumeOwnerEmail?: string;
  
   
    @IsString()
    @IsOptional()
    languageName: string;
  
    
    @IsString()
    @IsOptional()
    masteryLevel: string;
    
    
    @IsBoolean()
    @IsOptional()
    isVisible: boolean;
  }