import {
  IsNotEmpty,
  IsString,
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

export class CreateContractTypeDto {
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
}