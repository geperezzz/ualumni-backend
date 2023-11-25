import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsEmail,
  IsBoolean,
} from 'class-validator';

export class CreateHigherEducationStudyDto {
  @IsNotEmpty()
  @IsEmail()
  resumeOwnerEmail: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  institution: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;
}
