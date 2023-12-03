import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsOptional, IsUUID } from 'class-validator';

export class UpdateJobApplicationDto {
  @IsUUID()
  @IsOptional()
  jobOfferId: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  applicationTimestamp: Date;
}
