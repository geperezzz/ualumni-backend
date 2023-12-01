import { SetMetadata } from '@nestjs/common';
import { Role } from './role.type';

export const ALLOWED_ROLES_KEY = 'allowedRoles';

export function Allowed(
  ...allowedRoles: [Role, ...Role[]]
): ReturnType<typeof SetMetadata>;
export function Allowed(allowedRoles: 'all'): ReturnType<typeof SetMetadata>;
export function Allowed(
  ...allowedRoles: [Role | 'all', ...Role[]]
): ReturnType<typeof SetMetadata> {
  if (allowedRoles[0] === 'all') {
    return SetMetadata(ALLOWED_ROLES_KEY, 'all');
  }
  return SetMetadata(ALLOWED_ROLES_KEY, allowedRoles);
}
