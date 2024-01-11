import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsBoolean,
  Validate,
  MaxLength,
  IsDefined,
} from 'class-validator';
import { MasteryLevel } from 'prisma/ualumni/client';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class CreateResumeLanguageDto {
  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  languageName: string;

  @IsEnum(MasteryLevel)
  @IsNotEmpty()
  masteryLevel: string;

  @IsBoolean()
  @IsDefined()
  isVisible: boolean;
}
