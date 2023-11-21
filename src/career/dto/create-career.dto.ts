import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

// class is required for using DTO as a type
export class CreateCareerDto {
  @IsString()
  @IsOptional()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
