import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsBoolean,
  MaxLength,
  Validate,
  MinDate,
  MaxDate,
  IsDate,
} from 'class-validator';
import { UCAB_GUAYANA_CREATION_DATE } from 'src/common/constants/ucab-creation-date.constant';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class UpdateHigherEducationStudyDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  title?: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  institution?: string;

  @MaxDate(() => new Date())
  @MinDate(UCAB_GUAYANA_CREATION_DATE)
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: string;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;
}