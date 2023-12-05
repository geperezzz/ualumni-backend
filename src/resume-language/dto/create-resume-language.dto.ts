import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsEmail,
  IsBoolean,
} from 'class-validator';

export class CreateResumeLanguageDto {
  @IsNotEmpty()
  @IsString()
  languageName: string;

  @IsNotEmpty()
  @IsString()
  masteryLevel: number;

  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;
}
