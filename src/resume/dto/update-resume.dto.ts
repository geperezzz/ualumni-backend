import { IsBoolean, IsOptional, IsString, MaxLength, Validate } from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class UpdateResumeDto {
  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;

  @MaxLength(2000)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  aboutMe?: string;
}
