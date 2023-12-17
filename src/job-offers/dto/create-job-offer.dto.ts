import { Type } from 'class-transformer';
import {
  IsBase64,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateJobOfferDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  companyEmail: string;

  @IsBase64()
  @IsNotEmpty()
  companyLogo: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  offerLocation: string;

  @IsDate()
  @Type(() => Date)
  @IsDefined()
  offerTimestamp: Date;

  @IsString()
  @IsDefined()
  careerName: string;

  @IsString()
  @IsNotEmpty()
  contractTypeName: string;
}
