import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  Validate,
  MaxLength,
  IsDefined,
  IsUrl,
} from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class CreatePortfolioItemDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(150)
  @IsUrl()
  @IsDefined()
  sourceLink: string;

  @IsBoolean()
  @IsDefined()
  isVisible: boolean;
}
