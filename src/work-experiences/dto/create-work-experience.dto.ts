import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateWorkExperienceDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsDefined()
  @Type(() => Date)
  startDate: string;

  @IsDate()
  @IsDefined()
  @Type(() => Date)
  endDate: string;

  @IsBoolean()
  @IsDefined()
  @Type(() => Boolean)
  isVisible: boolean;
}
