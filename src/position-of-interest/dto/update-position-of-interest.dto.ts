import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePositionOfInterestDto {
  @IsString()
  @IsOptional()
  positionName?: string;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;
}
