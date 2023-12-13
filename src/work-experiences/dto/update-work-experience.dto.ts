import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateWorkExperienceDto {
  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isVisible?: boolean;
}
