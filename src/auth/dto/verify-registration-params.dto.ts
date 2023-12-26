import { IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyRegistrationParamsDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsEmail()
  @IsDefined()
  email: string;
}