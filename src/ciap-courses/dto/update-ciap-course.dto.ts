import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCiapCourseDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  date?: string;
}
