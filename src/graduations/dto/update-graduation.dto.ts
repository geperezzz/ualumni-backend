import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateGraduationDto {
  @IsString()
  @IsOptional()
  careerName: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  graduationDate: Date;
}
