import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_SESSION_NOT_REQUIRED_KEY } from './session-not-required.decorator';

@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isSesesionNotRequired = this.reflector.get<boolean>(
      IS_SESSION_NOT_REQUIRED_KEY,
      context.getHandler(),
    );
    if (isSesesionNotRequired) {
      return true;
    }

    let request = context.switchToHttp().getRequest<Request>();
    if (request.isAuthenticated()) {
      return true;
    }
    throw new UnauthorizedException('Log in to access this route', {});
  }
}
