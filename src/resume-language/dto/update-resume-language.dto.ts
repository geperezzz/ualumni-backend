import {
  IsString,
  IsBoolean,
  IsOptional,
  IsEnum,
  Validate,
  MaxLength,
} from 'class-validator';
import { MasteryLevel } from 'prisma/ualumni/client';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class UpdateResumeLanguageDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsOptional()
  languageName?: string;

  @IsEnum(MasteryLevel)
  @IsOptional()
  masteryLevel?: string;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;
}
