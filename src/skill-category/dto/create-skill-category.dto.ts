import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, MaxLength, Matches } from 'class-validator';

export class CreateSkillCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(/^[a-zA-Z ]*$/, {
    message: 'name must contain only letters and spaces',
  })
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @MaxLength(100, { each: true })
  @Matches(/^[a-zA-Z ]*$/, {
    each: true,
    message: 'Each item in relatedCareersNames must contain only letters and spaces',
  })
  relatedCareersNames: string[];

  constructor(name: string, relatedCareersNames: string[]) {
    this.name = name ? name.trim() : '';
    this.relatedCareersNames = relatedCareersNames ? relatedCareersNames.map(name => name ? name.trim() : '') : [];
  }
}

 
