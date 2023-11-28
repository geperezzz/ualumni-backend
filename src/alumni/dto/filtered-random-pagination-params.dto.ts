import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { RandomPaginationParamsDto } from 'src/common/dto/random-pagination-params.dto';

export class FilteredRandomPaginationParams extends RandomPaginationParamsDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Type(() => String)
  @Expose({ name: 'careers' })
  careersNames?: string[];

  @IsString()
  @IsOptional()
  @Type(() => String)
  @Expose({ name: 'name' })
  alumniNames?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Type(() => String)
  @Expose({ name: 'skills' })
  skillsNames?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Type(() => String)
  @Expose({ name: 'position' })
  positionsOfInterest?: string[];
}
