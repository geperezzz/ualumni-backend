import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateIndustryOfInterestDto {
  @IsString()
  @IsNotEmpty()
  industryName: string;

  @IsBoolean()
  @IsNotEmpty()
  isVisible: boolean;
}
