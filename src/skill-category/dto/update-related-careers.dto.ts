import { IsArray, IsOptional, IsString, MaxLength, Matches, Validate, IsNotEmpty, ArrayNotEmpty } from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class UpdateRelatedCareersDto {
  @MaxLength(100, { each: true })
  @Validate(IsNotOnlyWhitespace, { each: true })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  @IsOptional()
  removeRelatedCareersNames?: string[];

  @MaxLength(100, { each: true })
  @Validate(IsNotOnlyWhitespace, { each: true })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  @IsOptional()
  addRelatedCareersNames?: string[];
}