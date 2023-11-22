import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateHigherEducationStudyDto {
  @IsNotEmpty()
  @IsString()
  resumeId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  institution: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;
}