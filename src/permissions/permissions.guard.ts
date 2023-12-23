import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.type';
import { ALLOWED_ROLES_KEY } from './allowed-roles.decorator';
import { Request } from 'express';
import { User } from '../../prisma/ualumni/client';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.getAllAndOverride<
      [Role, ...Role[]] | 'all'
    >(ALLOWED_ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (allowedRoles === 'all') {
      return true;
    }
    const deduplicatedRoles = [...new Set(allowedRoles)];

    let request = context.switchToHttp().getRequest<Request>();
    if (request.user) {
      let user = request.user as User;
      if (deduplicatedRoles.includes(user.role.toLowerCase() as Role)) {
        return true;
      }
      throw new ForbiddenException(
        `Only a ${deduplicatedRoles.join(' or ')} can access this route`,
        {},
      );
    }
    if (deduplicatedRoles.includes('visitor')) {
      return true;
    }
    throw new ForbiddenException(
      `Only a ${deduplicatedRoles.join(' or ')} can access this route`,
      {},
    );
  }
}
