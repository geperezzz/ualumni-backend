import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateAlumniDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  names?: string;

  @IsString()
  @IsOptional()
  surnames?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsPhoneNumber('VE')
  @IsOptional()
  telephoneNumber?: string;
}
