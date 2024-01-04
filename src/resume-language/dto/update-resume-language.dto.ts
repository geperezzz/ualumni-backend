import {
  IsString,
  IsBoolean,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { MasteryLevel } from 'prisma/ualumni/client';

export class UpdateResumeLanguageDto {
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
