import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCiapCourseDto {
  @IsString()
  @IsOptional()
  name?: string;
}
