import { Type } from 'class-transformer';
import {
  IsBase64,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateJobOfferDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  companyEmail?: string;

  @IsBase64()
  @IsOptional()
  companyLogo?: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsString()
  @IsOptional()
  offerLocation?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  offerTimestamp?: Date;

  @IsString()
  @IsOptional()
  careerName?: string;

  @IsString()
  @IsOptional()
  contractTypeName?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isVisible?: boolean;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  visibleSince: Date;
}
