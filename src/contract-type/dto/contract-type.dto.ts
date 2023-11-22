import { IsNotEmpty, IsString } from 'class-validator';

export class ContractTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
