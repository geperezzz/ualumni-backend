import { Type } from 'class-transformer';
import {
  IsBase64,
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
  companyContact?: string;

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
}
