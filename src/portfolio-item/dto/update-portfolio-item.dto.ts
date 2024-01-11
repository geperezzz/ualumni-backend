import { IsString, IsEmail, IsBoolean, IsOptional, Validate, MaxLength, IsUrl } from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class UpdatePortfolioItemDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  title?: string;

  @MaxLength(150)
  @IsUrl()
  @IsOptional()
  sourceLink?: string;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;
}
