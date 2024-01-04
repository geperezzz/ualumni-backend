import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { MasteryLevel } from 'prisma/ualumni/client';

export class CreateResumeLanguageDto {
  @IsNotEmpty()
  @IsString()
  languageName: string;

  @IsNotEmpty()
  @IsEnum(MasteryLevel)
  masteryLevel: string;

  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;
}
