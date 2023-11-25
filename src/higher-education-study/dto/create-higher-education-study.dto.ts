import { IsNotEmpty, IsString, IsDate, IsUUID } from 'class-validator';

export class CreateHigherEducationStudyDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  resumeId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  institution: string;

  @IsNotEmpty()
  @IsString()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsString()
  @IsDate()
  endDate: Date;
}
