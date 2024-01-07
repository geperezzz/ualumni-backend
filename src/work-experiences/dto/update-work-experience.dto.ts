import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString,ValidatorConstraintInterface,
  ValidationArguments,
  ValidatorConstraint,
  MaxLength,
  Matches,
  Validate, } from 'class-validator';

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



export class UpdateWorkExperienceDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\s\W]*$/, {
    message: 'companyName can contain letters, accents, numbers, special characters, and spaces',
  })
  @Validate(IsNotOnlyWhitespace, {
    message: 'companyName must not be only whitespace',
  })
  companyName: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\s\W]*$/, {
    message: 'Position can contain letters, accents, numbers, special characters, and spaces',
  })
  @Validate(IsNotOnlyWhitespace, {
    message: 'Position must not be only whitespace',
  })
  position: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\s\W]*$/, {
    message: 'Description can contain letters, accents, numbers, special characters, and spaces',
  })
  @Validate(IsNotOnlyWhitespace, {
    message: 'Description must not be only whitespace',
  })
  description: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  @Validate(IsDateBetween1950AndNow, {
    message: 'endDate must be between 1950 and the current date',
  })
  endDate: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isVisible: boolean;
}
