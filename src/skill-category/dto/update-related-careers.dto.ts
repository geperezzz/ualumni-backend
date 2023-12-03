import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateRelatedCareersDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  removeRelatedCareersNames?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  addRelatedCareersNames?: string[];
}
