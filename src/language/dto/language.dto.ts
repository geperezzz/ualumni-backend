import { IsNotEmpty, IsString } from 'class-validator';

export class LanguageDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
