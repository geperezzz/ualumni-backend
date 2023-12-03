import { Module } from '@nestjs/common';
import { PermissionsGuard } from './permissions.guard';

@Module({
  providers: [PermissionsGuard],
})
export class PermissionsModule {}
