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
  MaxDate,
  ValidationArguments
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotOnlyWhitespace', async: false })
class IsNotOnlyWhitespace implements ValidatorConstraintInterface {
  validate(text: string) {
    return text.trim().length > 0;
  }
}

@ValidatorConstraint({ name: 'IsDateBetween1950AndNow', async: false })
export class IsDateBetween1950AndNow implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const date = new Date(text);
    const minDate = new Date(1950, 0, 1);
    const maxDate = new Date();
    return date >= minDate && date <= maxDate;
  }

  defaultMessage(args: ValidationArguments) {
    return 'endDate must be between 1950 and the current date';
  }
}

export class CreateCiapCourseDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\s\W]*$/, {
    message: 'name can contain letters, accents, numbers, special characters, and spaces',
  })
  @Validate(IsNotOnlyWhitespace, {
    message: 'name must not be only whitespace',
  })
  name: string;

  @Validate(IsDateBetween1950AndNow, {
    message: 'endDate must be between 1950 and the current date',
  })
  date: string;
}