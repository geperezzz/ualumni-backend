import { IsNotEmpty, IsString } from 'class-validator';

// class is required for using DTO as a type
export class CreateCareerDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
