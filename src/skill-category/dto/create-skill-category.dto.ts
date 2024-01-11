import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, MaxLength, Validate, IsDefined } from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class CreateSkillCategoryDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(100, { each: true })
  @Validate(IsNotOnlyWhitespace, { each: true })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  @IsDefined()
  relatedCareersNames: string[];
}

 
