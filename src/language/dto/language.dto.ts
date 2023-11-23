import { Language } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export type LanguageDto = Language;
/*{
  @IsString()
  @IsNotEmpty()
  name: string;
}*/
