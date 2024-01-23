import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
  Validate,
  MinDate,
  MaxDate,
  IsOptional,
} from 'class-validator';
import { UCAB_GUAYANA_CREATION_DATE } from 'src/common/constants/ucab-creation-date.constant';
import { IsBefore } from 'src/common/validators/is-before.validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class CreateWorkExperienceDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  position: string;

  @MaxLength(1000)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Validate(IsBefore, [{ propertyName: 'endDate' }])
  @MaxDate(() => new Date())
  @MinDate(UCAB_GUAYANA_CREATION_DATE)
  @IsDate()
  @Type(() => Date)
  @IsDefined()
  startDate: string;

  @MaxDate(() => new Date())
  @MinDate(UCAB_GUAYANA_CREATION_DATE)
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: string;

  @IsBoolean()
  @Type(() => Boolean)
  @IsDefined()
  isVisible: boolean;
}
