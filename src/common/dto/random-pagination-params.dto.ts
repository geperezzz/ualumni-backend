import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationParamsDto } from './pagination-params.dto';

export class RandomPaginationParamsDto extends PaginationParamsDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Expose({ name: 'seed' })
  randomizationSeed?: number;
}
