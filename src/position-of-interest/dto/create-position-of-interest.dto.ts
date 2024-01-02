import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MaxLength,
  Matches,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotOnlyWhitespace', async: false })
class IsNotOnlyWhitespace implements ValidatorConstraintInterface {
  validate(text: string) {
    return text.trim().length > 0;
  }
}

export class CreatePositionOfInterestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'positionName must contain only letters and spaces',
  })
  @Validate(IsNotOnlyWhitespace, {
    message: 'positionName must not be only whitespace',
  })
  positionName: string;

  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;
}