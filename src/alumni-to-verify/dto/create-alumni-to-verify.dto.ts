import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAlumniToVerifyDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
