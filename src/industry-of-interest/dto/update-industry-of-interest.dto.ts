import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateIndustryOfInterestDto {
  @IsString()
  @IsOptional()
  industryName?: string;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;
}
