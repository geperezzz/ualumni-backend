import { Module } from '@nestjs/common';
import { GraduationsService } from './graduations.service';
import { GraduationsController } from './graduations.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';

@Module({
  imports: [UalumniDbModule],
  controllers: [GraduationsController],
  providers: [GraduationsService],
})
export class GraduationsModule {}
