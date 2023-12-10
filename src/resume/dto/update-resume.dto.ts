import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateResumeDto {
  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;

  @IsString()
  @IsOptional()
  aboutMe?: string;
}
