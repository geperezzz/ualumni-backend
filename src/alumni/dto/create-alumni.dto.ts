import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAlumniDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  names: string;

  @IsString()
  @IsNotEmpty()
  surnames: string;

  @IsString()
  @IsNotEmpty()
  telephoneNumber: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
