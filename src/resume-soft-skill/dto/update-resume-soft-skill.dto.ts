import { IsOptional, IsString, IsBoolean, MaxLength, Matches, Validate, IsNotEmpty } from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class UpdateResumeSoftSkillDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  skillName?: string;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;
}