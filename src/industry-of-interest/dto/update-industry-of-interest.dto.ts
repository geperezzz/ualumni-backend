import {
  IsOptional,
  IsString,
  IsBoolean,
  MaxLength,
  Validate,
} from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class UpdateIndustryOfInterestDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  industryName?: string;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;
}