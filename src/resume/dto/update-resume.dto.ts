import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateResumeDto {
  @IsInt()
  @IsOptional()
  numberOfDownloads?: number;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;

  @IsString()
  @IsOptional()
  aboutMe?: string;
}
