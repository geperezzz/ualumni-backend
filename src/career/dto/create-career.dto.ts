import {
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches,
  Validate,
} from 'class-validator';

import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class CreateCareerDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  name: string;
}