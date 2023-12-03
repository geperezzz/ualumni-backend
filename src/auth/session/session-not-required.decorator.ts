import { SetMetadata } from '@nestjs/common';

export const IS_SESSION_NOT_REQUIRED_KEY = 'isSessionNotRequired';
export const SessionNotRequired = () =>
  SetMetadata(IS_SESSION_NOT_REQUIRED_KEY, true);
