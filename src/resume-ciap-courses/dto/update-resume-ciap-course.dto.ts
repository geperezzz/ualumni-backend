import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateResumeCiapCourseDto {
  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;
}
