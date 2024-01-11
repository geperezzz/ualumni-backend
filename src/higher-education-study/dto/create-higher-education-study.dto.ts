import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MaxLength,
  Validate,
  MinDate,
  MaxDate,
  IsDate,
  IsDefined,
} from 'class-validator';
import { UCAB_GUAYANA_CREATION_DATE } from 'src/common/constants/ucab-creation-date.constant';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class CreateHigherEducationStudyDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  institution: string;

  @MaxDate(() => new Date())
  @MinDate(UCAB_GUAYANA_CREATION_DATE)
  @IsDate()
  @Type(() => Date)
  @IsDefined()
  endDate: string;

  @IsBoolean()
  @IsDefined()
  isVisible: boolean;
}