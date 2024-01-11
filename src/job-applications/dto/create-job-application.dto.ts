import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsUUID, MaxDate, MinDate } from 'class-validator';
import { UCAB_GUAYANA_CREATION_DATE } from 'src/common/constants/ucab-creation-date.constant';

export class CreateJobApplicationDto {
  @IsUUID()
  @IsDefined()
  jobOfferId: string;

  @MaxDate(() => new Date())
  @MinDate(UCAB_GUAYANA_CREATION_DATE)
  @IsDate()
  @Type(() => Date)
  @IsDefined()
  applicationTimestamp: Date;
}
