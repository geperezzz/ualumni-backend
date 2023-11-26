import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResumeCiapCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
