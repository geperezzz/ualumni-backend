import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MaxLength,
  Validate,
  IsDefined,
} from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class CreatePositionOfInterestDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  positionName: string;

  @IsBoolean()
  @IsDefined()
  isVisible: boolean;
}