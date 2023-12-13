import { Module } from '@nestjs/common';

import { UalumniDbService } from './ualumni-db.service';

@Module({
  providers: [UalumniDbService],
  exports: [UalumniDbService],
})
export class UalumniDbModule {}
