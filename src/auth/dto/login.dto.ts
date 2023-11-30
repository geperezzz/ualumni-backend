import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsDefined()
  alumniEmail: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
