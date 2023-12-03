import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsUUID } from 'class-validator';

export class CreateJobApplicationDto {
  @IsUUID()
  @IsDefined()
  jobOfferId: string;

  @IsDate()
  @IsDefined()
  @Type(() => Date)
  applicationTimestamp: Date;
}
