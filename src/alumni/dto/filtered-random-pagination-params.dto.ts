import { Expose, Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class FilterParams {
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (value) return [value];
  })
  @Expose({ name: 'careers' })
  careersNames?: string[] | undefined;

  @IsString()
  @IsOptional()
  @Expose({ name: 'name' })
  alumniName?: string | undefined;

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (value) return [value];
  })
  @Expose({ name: 'skills' })
  skillsNames?: string[] | undefined;

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (value) return [value];
  })
  @Expose({ name: 'positions' })
  positionsOfInterest?: string[] | undefined;

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (value) return [value];
  })
  @Expose({ name: 'industries' })
  industriesOfInterest?: string[] | undefined;

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (value) return [value];
  })
  @Expose({ name: 'categories' })
  skillCategories?: string[] | undefined;
}
