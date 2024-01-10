import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidatorConstraint,
  MaxLength,
  Matches,
  Validate,
  IsDateString,
  ValidationOptions,
  ValidateBy,
} from 'class-validator';

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

@ValidatorConstraint({ name: 'isNotOnlyWhitespace', async: false })
class IsNotOnlyWhitespace implements ValidatorConstraintInterface {
  validate(text: string) {
    return text.trim().length > 0;
  }
}

export class CreateWorkExperienceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\s\W]*$/, {
    message:
      'companyName can contain letters, accents, numbers, special characters, and spaces',
  })
  @Validate(IsNotOnlyWhitespace, {
    message: 'companyName must not be only whitespace',
  })
  companyName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\s\W]*$/, {
    message:
      'Position can contain letters, accents, numbers, special characters, and spaces',
  })
  @Validate(IsNotOnlyWhitespace, {
    message: 'Position must not be only whitespace',
  })
  position: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  @Matches(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\s\W]*$/, {
    message:
      'Description can contain letters, accents, numbers, special characters, and spaces',
  })
  @Validate(IsNotOnlyWhitespace, {
    message: 'Description must not be only whitespace',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @Validate(IsDateBetween1950AndNow)
  @Transform(({ value }) => new Date(value).toISOString())
  startDate: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  @Validate(IsDateBetween1950AndNow)
  @Transform(({ value }) => new Date(value).toISOString())
  endDate: string;

  @IsBoolean()
  @IsDefined()
  @Type(() => Boolean)
  isVisible: boolean;
}
