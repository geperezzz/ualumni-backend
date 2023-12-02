import { IsOptional, IsString } from 'class-validator';

export class UpdateContractTypeDto {
  @IsString()
  @IsOptional()
  name?: string;
}
