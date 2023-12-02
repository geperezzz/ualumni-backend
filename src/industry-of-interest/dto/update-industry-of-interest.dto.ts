import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateIndustryOfInterestDto {
  @IsEmail()
  @IsOptional()
  resumeOwnerEmail?: string;

  @IsString()
  @IsOptional()
  industryName?: string;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;
}
