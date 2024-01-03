import { IsArray, IsOptional, IsString, MaxLength, Matches } from 'class-validator';

export class UpdateSkillCategoryDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'name must contain only letters and spaces',
  })
  name?: string;

  
}