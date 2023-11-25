import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCiapCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
