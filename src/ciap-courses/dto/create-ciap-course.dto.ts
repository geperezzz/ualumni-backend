import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Validate,
  IsDefined,
  IsDate,
  MinDate,
  MaxDate
} from 'class-validator';
import { UCAB_GUAYANA_CREATION_DATE } from 'src/common/constants/ucab-creation-date.constant';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class CreateCiapCourseDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxDate(() => new Date())
  @MinDate(UCAB_GUAYANA_CREATION_DATE)
  @IsDate()
  @Type(() => Date)
  @IsDefined()
  date: Date;
}