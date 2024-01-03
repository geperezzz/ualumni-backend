import { IsArray, IsOptional, IsString, MaxLength, Matches } from 'class-validator';

export class UpdateRelatedCareersDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(100, { each: true })
  @Matches(/^[a-zA-Z ]*$/, {
    each: true,
    message: 'Each item in removeRelatedCareersNames must contain only letters and spaces',
  })
  removeRelatedCareersNames?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(100, { each: true })
  @Matches(/^[a-zA-Z ]*$/, {
    each: true,
    message: 'Each item in addRelatedCareersNames must contain only letters and spaces',
  })
  addRelatedCareersNames?: string[];

  

}