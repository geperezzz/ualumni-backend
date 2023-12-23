import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../../../prisma/ualumni/client';
import { Request } from 'express';

export const SessionUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User | undefined => {
    const request = context.switchToHttp().getRequest<Request>();
    return request.user as User | undefined;
  },
);
