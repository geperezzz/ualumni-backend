import { ResponseDto } from './response.dto';

export type PageDto<T> = {
  page: number;
  perPage: number;
  pageCount: number;
  totalCount: number;
  items: T[];
};

export type PaginatedResponseDto<T> = ResponseDto<PageDto<T>>;
