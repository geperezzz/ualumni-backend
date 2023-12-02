import { Module } from '@nestjs/common';
import { ContractTypeService } from './contract-type.service';
import { ContractTypeController } from './contract-type.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ContractTypeController],
  providers: [ContractTypeService],
})
export class ContractTypeModule {}
