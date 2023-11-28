import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { RandomPaginationParamsDto } from 'src/common/dto/random-pagination-params.dto';

export class FilteredRandomPaginationParams extends RandomPaginationParamsDto {
  @IsString({ each: true })
  @IsOptional()
  @Type(() => String)
  @Expose({ name: 'careers' })
  careersNames?: string[] | string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  @Expose({ name: 'name' })
  alumniName?: string;

  @IsString({ each: true })
  @IsOptional()
  @Type(() => String)
  @Expose({ name: 'skills' })
  skillsNames?: string[];

  @IsString({ each: true })
  @IsOptional()
  @Type(() => String)
  @Expose({ name: 'position' })
  positionsOfInterest?: string[];
}
