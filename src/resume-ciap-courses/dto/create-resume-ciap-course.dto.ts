import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateResumeCiapCourseDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
