import { IsNotEmpty, IsString, IsBoolean, MaxLength, IsDefined, Validate } from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class CreateResumeSoftSkillDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  skillName: string;

  @IsBoolean()
  @IsDefined()
  isVisible: boolean;
}