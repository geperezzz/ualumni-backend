import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
