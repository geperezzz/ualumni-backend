import { IsNotEmpty, IsString, IsBoolean, MaxLength, Matches, Validate, IsDefined } from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class CreateResumeTechnicalSkillDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  skillCategoryName: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  skillName: string;

  @IsBoolean()
  @IsDefined()
  isVisible: boolean;
}
