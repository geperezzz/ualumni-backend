import {
  IsString,
  IsBoolean,
  IsOptional,
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
