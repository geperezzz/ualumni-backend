import { Page } from '../interfaces/page.interface';
import { ResponseDto } from './response.dto';

export type PageDto<T> = Page<T>;

export type PagedResponseDto<T> = ResponseDto<PageDto<T>>;
