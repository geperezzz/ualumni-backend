import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type, plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AlumniFilterSkillDto {
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @IsString()
  @IsNotEmpty()
  skillName: string;
}

export class AlumniFilterParamsDto {
  @ApiProperty({ name: 'name' })
  @IsString()
  @IsOptional()
  @Expose({ name: 'name' })
  alumniName?: string;

  @ApiProperty({ name: 'careers' })
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') return [value];
  })
  @Expose({ name: 'careers' })
  careersNames?: string[];

  @ApiProperty({ name: 'skills', type: Array<string> })
  @ValidateNested({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') value = [value];

    return value?.map((categoryWithSkill: string) => {
      const [categoryName, skillName] = categoryWithSkill.split(':');
      return plainToInstance(AlumniFilterSkillDto, {
        categoryName,
        skillName,
      });
    });
  })
  @Expose({ name: 'skills' })
  skills?: AlumniFilterSkillDto[];

  @ApiProperty({ name: 'positions' })
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') return [value];
  })
  @Expose({ name: 'positions' })
  positionsOfInterest?: string[];

  @ApiProperty({ name: 'industries' })
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') return [value];
  })
  @Expose({ name: 'industries' })
  industriesOfInterest?: string[];

  @ApiProperty({ name: 'categories' })
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') return [value];
  })
  @Expose({ name: 'categories' })
  skillCategories?: string[];
}
