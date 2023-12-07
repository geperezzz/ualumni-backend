import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';

@Module({
  imports: [UalumniDbModule],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
