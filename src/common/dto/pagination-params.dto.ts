import { Expose, Transform, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_ITEMS_PER_PAGE = 10;

export class PaginationParamsDto {
  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => value ?? DEFAULT_PAGE_NUMBER)
  @Expose({ name: 'page' })
  pageNumber: number;

  @IsInt()
  @Type(() => Number)
  @Transform(({ value }) => value ?? DEFAULT_ITEMS_PER_PAGE)
  @Expose({ name: 'per-page' })
  itemsPerPage: number;
}