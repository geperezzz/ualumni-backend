import { IsBoolean, IsDefined } from 'class-validator';


export class ToggleResumeVisibilityDto {
    @IsBoolean()
    @IsDefined()
    isVisible: boolean;
  }
  