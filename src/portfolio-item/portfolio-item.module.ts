import { Module } from '@nestjs/common';
import { PortfolioItemService } from './portfolio-item.service';
import { PortfolioItemController } from './portfolio-item.controller';
import { UalumniDbModule } from 'src/ualumni-db/ualumni-db.module';

@Module({
  imports: [UalumniDbModule],
  controllers: [PortfolioItemController],
  providers: [PortfolioItemService],
})
export class PortfolioItemModule {}
