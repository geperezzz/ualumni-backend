import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';

export const SessionUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    if (!request.user) {
      throw new UnauthorizedException();
    }
    return request.user as User;
  },
);
