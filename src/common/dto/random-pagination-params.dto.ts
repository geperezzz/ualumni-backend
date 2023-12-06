import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationParamsDto } from './pagination-params.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RandomPaginationParamsDto extends PaginationParamsDto {
  @ApiProperty({ name: 'seed' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Expose({ name: 'seed' })
  randomizationSeed?: number;
}
