import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreatePositionOfInterestDto {
  @IsString()
  @IsNotEmpty()
  positionName: string;

  @IsBoolean()
  @IsNotEmpty()
  isVisible: boolean;
}
