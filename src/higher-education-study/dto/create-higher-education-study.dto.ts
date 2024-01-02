import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsBoolean,
  MaxLength,
  Matches,
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

export class CreateHigherEducationStudyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'title must contain only letters and spaces',
  })
  @Validate(IsNotOnlyWhitespace, {
    message: 'title must not be only whitespace',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  institution: string;

  @IsNotEmpty()
  @IsDateString()
  @MinDate(new Date(1950, 0, 1))
  @MaxDate(new Date())
  endDate: string;

  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;
}