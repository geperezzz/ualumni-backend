import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
  MinDate,
  MaxDate,
} from 'class-validator';
import { UCAB_GUAYANA_CREATION_DATE } from 'src/common/constants/ucab-creation-date.constant';
import { IsBefore } from 'src/common/validators/is-before.validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class UpdateWorkExperienceDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  companyName?: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  position?: string;

  @MaxLength(1000)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  description?: string;

  @Validate(IsBefore, [{ propertyName: 'endDate', isOptional: true }])
  @MaxDate(() => new Date())
  @MinDate(UCAB_GUAYANA_CREATION_DATE)
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @MaxDate(() => new Date())
  @MinDate(UCAB_GUAYANA_CREATION_DATE)
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  isVisible?: boolean;
}
