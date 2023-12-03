import { IsOptional, IsString } from 'class-validator';

export class UpdateLanguageDto {
  @IsString()
  @IsOptional()
  name?: string;
}
