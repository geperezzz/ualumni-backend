import { Expose, Transform, Type, plainToInstance } from 'class-transformer';
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
  @IsString()
  @IsOptional()
  @Expose({ name: 'company' })
  companyName?: string;

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => value?.split(','))
  @Expose({ name: 'careers' })
  careersNames?: string[];

  @ValidateNested({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    return value?.split(',')?.map((categoryWithSkill: string) => {
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
  @Transform(({ value }) => value?.split(','))
  positions?: string[];

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => value?.split(','))
  contracts?: string[];
}
