import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCiapCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
