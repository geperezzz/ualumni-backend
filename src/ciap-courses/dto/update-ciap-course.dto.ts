import { IsOptional, IsString } from 'class-validator';

export class UpdateCiapCourseDto {
  @IsString()
  @IsOptional()
  name?: string;
}
