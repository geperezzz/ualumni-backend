import { IsOptional, IsString, MaxLength, Matches, Validate } from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class UpdateSkillCategoryDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  name?: string;
}