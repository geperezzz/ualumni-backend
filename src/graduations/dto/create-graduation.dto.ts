import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, IsDate, MinDate, MaxDate, Validate, IsDefined } from 'class-validator';
import { UCAB_GUAYANA_CREATION_DATE } from 'src/common/constants/ucab-creation-date.constant';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class CreateGraduationDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  careerName: string;

  @MaxDate(() => new Date())
  @MinDate(UCAB_GUAYANA_CREATION_DATE)
  @IsDate()
  @Type(() => Date)
  @IsDefined()
  graduationDate: Date;
}