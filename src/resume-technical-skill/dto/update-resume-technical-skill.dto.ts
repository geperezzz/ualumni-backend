import { IsString, IsEmail, IsBoolean, IsOptional, MaxLength, Matches, IsNotEmpty, Validate  } from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class UpdateResumeTechnicalSkillDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  skillCategoryName?: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  skillName?: string;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;
}
