import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateResumeCiapCourseDto {
  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;
}
