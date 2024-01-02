import { IsNotEmpty, IsString, MaxLength, Matches } from 'class-validator';

export class CreateLanguageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'name must contain only letters and spaces',
  })
  name: string;

  constructor(name: string) {
    this.name =name ?  name.trim():'';
  }
}
