import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContractTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
