import { IsOptional, IsString, MaxLength, Matches } from 'class-validator';

export class UpdateLanguageDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'name must contain only letters and spaces',
  })
  name?: string;
}