import {
  IsOptional,
  IsString,
  IsDateString,
  IsBoolean,
  MaxLength,
  Matches,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  MinDate,
  MaxDate
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

export class UpdateHigherEducationStudyDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\s\W]*$/, {
    message: 'Title can contain letters, accents, numbers, special characters, and spaces',
  })
  @Validate(IsNotOnlyWhitespace, {
    message: 'title must not be only whitespace',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\s\W]*$/, {
    message: 'institution can contain letters, accents, numbers, special characters, and spaces',
  })
  @Validate(IsNotOnlyWhitespace, {
    message: 'institution must not be only whitespace',
  })
  institution: string;

  @IsOptional()
  @IsDateString()
  @Validate(IsDateBetween1950AndNow, {
    message: 'endDate must be between 1950 and the current date',
  })
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;
}