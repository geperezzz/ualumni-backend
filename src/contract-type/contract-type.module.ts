import { Module } from '@nestjs/common';
import { ContractTypeService } from './contract-type.service';
import { ContractTypeController } from './contract-type.controller';
import { PrismaModule } from 'src/ualumni-database/ualumni-database.module';

@Module({
  imports: [PrismaModule],
  controllers: [ContractTypeController],
  providers: [ContractTypeService],
})
export class ContractTypeModule {}
