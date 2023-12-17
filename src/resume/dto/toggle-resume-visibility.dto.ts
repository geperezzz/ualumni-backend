import { IsBoolean, IsOptional, IsString } from 'class-validator';


export class ToggleResumeVisibilityDto {
    @IsBoolean()
    isVisible: boolean;
  }
  