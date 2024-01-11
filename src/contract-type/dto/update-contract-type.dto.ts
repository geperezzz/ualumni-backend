import {
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class UpdateContractTypeDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  name?: string;
}