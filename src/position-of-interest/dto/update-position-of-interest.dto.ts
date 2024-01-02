import {
  IsOptional,
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

export class UpdatePositionOfInterestDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'positionName must contain only letters and spaces',
  })
  @Validate(IsNotOnlyWhitespace, {
    message: 'positionName must not be only whitespace',
  })
  positionName?: string;

  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;
}