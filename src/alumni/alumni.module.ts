import { Module } from '@nestjs/common';
import { AlumniService } from './alumni.service';
import { AlumniController } from './alumni.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AlumniController],
  providers: [AlumniService],
})
export class AlumniModule {}
