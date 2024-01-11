import {
  IsOptional,
  IsString,
  IsBoolean,
  MaxLength,
  Validate,
} from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class UpdatePositionOfInterestDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  positionName?: string;

  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;
}