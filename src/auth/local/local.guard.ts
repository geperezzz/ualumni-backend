import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let result = (await super.canActivate(context)) as boolean;
    let request = context.switchToHttp().getRequest<Request>();
    await super.logIn(request);
    return result;
  }
}
