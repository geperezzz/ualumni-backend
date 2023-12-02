import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let canActivate = (await super.canActivate(context)) as boolean;
    if (!canActivate) {
      throw new UnauthorizedException();
    }
    
    let request = context.switchToHttp().getRequest<Request>();
    await super.logIn(request);
    return true;
  }
}
