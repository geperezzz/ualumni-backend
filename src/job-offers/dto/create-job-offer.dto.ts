import { Type } from 'class-transformer';
import {
  IsBase64,
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxDate,
  MaxLength,
  MinDate,
  Validate,
} from 'class-validator';
import { UCAB_GUAYANA_CREATION_DATE } from 'src/common/constants/ucab-creation-date.constant';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class CreateJobOfferDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @MaxLength(200)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  description: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @MaxLength(100)
  @IsEmail()
  @IsNotEmpty()
  companyEmail: string;

  @IsBase64()
  @IsNotEmpty()
  companyLogo: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  department: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  position: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  offerLocation: string;

  @MaxDate(() => new Date())
  @MinDate(UCAB_GUAYANA_CREATION_DATE)
  @IsDate()
  @Type(() => Date)
  @IsDefined()
  offerTimestamp: Date;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  careerName: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  contractTypeName: string;
}
