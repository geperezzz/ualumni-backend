import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationParamsDto } from './pagination-params.dto';

export class RandomPaginationParamsDto extends PaginationParamsDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Expose({ name: 'seed' })
  randomizationSeed?: number;
}
