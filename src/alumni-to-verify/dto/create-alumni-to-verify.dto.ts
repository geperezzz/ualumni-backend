import { IsDefined, IsEmail, IsNotEmpty, IsString, MaxLength, Validate } from 'class-validator';
import { IsNotOnlyWhitespace } from 'src/common/validators/is-not-only-whitespace.validator';

export class CreateAlumniToVerifyDto {
  @MaxLength(100)
  @IsEmail()
  @IsDefined()
  email: string;

  @MaxLength(100)
  @Validate(IsNotOnlyWhitespace)
  @IsString()
  @IsNotEmpty()
  password: string;
}
