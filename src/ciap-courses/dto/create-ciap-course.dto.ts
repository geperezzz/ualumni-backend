import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  MinDate,
  MaxDate
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotOnlyWhitespace', async: false })
class IsNotOnlyWhitespace implements ValidatorConstraintInterface {
  validate(text: string) {
    return text.trim().length > 0;
  }
}

export class CreateCiapCourseDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'name must contain only letters and spaces',
  })
  @Validate(IsNotOnlyWhitespace, {
    message: 'name must not be only whitespace',
  })
  name: string;

  @IsDateString()
  @IsDateString()
  @MinDate(new Date(1950, 0, 1))
  @MaxDate(new Date())
  date: string;
}