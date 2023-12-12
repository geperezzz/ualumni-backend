import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsEmail,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class CreateResumeLanguageDto {
  @IsNotEmpty()
  @IsString()
  languageName: string;

  @IsNotEmpty()
  @IsInt()
  masteryLevel: number;

  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;
}
