import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateGraduationDto {
  @IsString()
  @IsNotEmpty()
  careerName: string;

  @IsDate()
  @IsDefined()
  @Type(() => Date)
  graduationDate: Date;
}
