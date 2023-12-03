import { RandomPage } from '../interfaces/random-page.interface';
import { ResponseDto } from './response.dto';

export type RandomPageDto<T> = RandomPage<T>;

export type RandomlyPagedResponseDto<T> = ResponseDto<RandomPageDto<T>>;
