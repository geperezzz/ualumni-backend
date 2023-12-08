import { Module } from '@nestjs/common';
import { UcabDbService } from './ucab-db.service';

@Module({
  providers: [UcabDbService],
  exports: [UcabDbService],
})
export class UcabDbModule {}
