import { Type } from 'class-transformer';
import { IsDateString,ValidationArguments, IsOptional, IsString, MaxLength, Matches, IsDate, MinDate, MaxDate, Validate,  ValidatorConstraint,  ValidatorConstraintInterface,} from 'class-validator';


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

export class UpdateGraduationDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\s\W]*$/, {
    message: 'careerName can contain letters, accents, numbers, special characters, and spaces',
  })
  @Validate(IsNotOnlyWhitespace, {
    message: 'careerName must not be only whitespace',
  })
  careerName: string;

  @IsOptional()
  @IsDateString()
  @Validate(IsDateBetween1950AndNow, {
    message: 'endDate must be between 1950 and the current date',
  })
  graduationDate: Date;
}
