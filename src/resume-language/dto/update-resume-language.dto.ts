import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsDateString,
  IsInt,
} from 'class-validator';

export class UpdateResumeLanguageDto {
  @IsString()
  @IsOptional()
  languageName?: string;

  @IsInt()
  @IsOptional()
  masteryLevel?: number;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;
}
