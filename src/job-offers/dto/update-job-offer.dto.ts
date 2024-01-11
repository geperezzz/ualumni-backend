import { Type } from 'class-transformer';
import {
  IsBase64,
  IsBoolean,
  IsDate,
  IsEmail,
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

export class UpdateJobOfferDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @MaxLength(200)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  description?: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  companyName?: string;

  @MaxLength(100)
  @IsEmail()
  @IsOptional()
  companyEmail?: string;

  @IsBase64()
  @IsOptional()
  companyLogo?: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  department?: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  position?: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  offerLocation?: string;

  @MaxDate(() => new Date())
  @MinDate(UCAB_GUAYANA_CREATION_DATE)
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  offerTimestamp?: Date;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  careerName?: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  contractTypeName?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isVisible?: boolean;

  @MaxDate(() => new Date())
  @MinDate(UCAB_GUAYANA_CREATION_DATE)
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  visibleSince: Date;
}
