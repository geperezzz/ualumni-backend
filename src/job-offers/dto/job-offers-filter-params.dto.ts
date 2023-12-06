import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class JobOfferFilterSkillDto {
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @IsString()
  @IsNotEmpty()
  skillName: string;
}

export class JobOffersFilterParamsDto {
  @ApiProperty({ name: 'company' })
  @IsString()
  @IsOptional()
  @Expose({ name: 'company' })
  companyName?: string;

  @ApiProperty({ name: 'careers' })
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? [value] : value)
  @Expose({ name: 'careers' })
  careersNames?: string[];

  @ApiProperty({ name: 'skills', type: Array<string> })
  @ValidateNested({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      value = [value];
    }

    return value?.map((categoryWithSkill: string) => {
      const [categoryName, skillName] = categoryWithSkill.split(':');
      return plainToInstance(JobOfferFilterSkillDto, {
        categoryName,
        skillName,
      });
    });
  })
  skills?: JobOfferFilterSkillDto[];

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? [value] : value)
  positions?: string[];

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? [value] : value)
  contracts?: string[];
}
