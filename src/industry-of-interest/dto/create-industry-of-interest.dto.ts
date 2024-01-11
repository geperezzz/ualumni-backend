import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MaxLength,
  Validate,
  IsDefined,
} from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class CreateIndustryOfInterestDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  industryName: string;

  @IsBoolean()
  @IsDefined()
  isVisible: boolean;
}