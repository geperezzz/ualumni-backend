import { IsString, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class UpdateHigherEducationStudyDto {
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
  isVisible?: boolean;
}
