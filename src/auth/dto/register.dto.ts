import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  names: string;

  @IsString()
  @IsNotEmpty()
  surnames: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
