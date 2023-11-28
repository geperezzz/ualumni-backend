import { HttpStatus } from '@nestjs/common';

export type ResponseDto<T> = {
  statusCode: HttpStatus;
  data: T;
};
