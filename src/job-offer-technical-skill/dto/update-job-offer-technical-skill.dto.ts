import { IsOptional, IsString, IsUUID, MaxLength, Validate } from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class UpdateJobOfferTechnicalSkillDto {
  @IsOptional()
  @IsUUID()
  jobOfferId?: string;

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
}
