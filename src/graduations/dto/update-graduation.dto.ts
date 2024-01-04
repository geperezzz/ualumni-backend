import { Type } from 'class-transformer';
import { IsOptional, IsString, MaxLength, Matches, IsDate, MinDate, MaxDate, Validate,  ValidatorConstraint,  ValidatorConstraintInterface,} from 'class-validator';


@ValidatorConstraint({ name: 'isNotOnlyWhitespace', async: false })
class IsNotOnlyWhitespace implements ValidatorConstraintInterface {
  validate(text: string) {
    return text.trim().length > 0;
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

  @IsDate({ message: 'graduationDate must be a valid date' })
  @MinDate(new Date(1950, 0, 1), { message: 'graduationDate must be after 1950-01-01' })
  @MaxDate(new Date(), { message: 'graduationDate must be before or on the current date' })
  graduationDate: Date;
}
