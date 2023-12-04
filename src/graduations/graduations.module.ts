import { Module } from '@nestjs/common';
import { GraduationsService } from './graduations.service';
import { GraduationsController } from './graduations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GraduationsController],
  providers: [GraduationsService],
})
export class GraduationsModule {}