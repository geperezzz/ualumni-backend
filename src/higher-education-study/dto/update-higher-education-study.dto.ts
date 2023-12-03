import {
  IsString,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class UpdateHigherEducationStudyDto {
  @IsEmail()
  @IsOptional()
  resumeOwnerEmail?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  institution?: string;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsBoolean()
  @IsOptional()
  isVisible?: Boolean;
}
