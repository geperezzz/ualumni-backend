import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';

@Module({
  imports: [UalumniDbModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
