import { Module } from '@nestjs/common';
import { PortfolioItemService } from './portfolio-item.service';
import { PortfolioItemController } from './portfolio-item.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PortfolioItemController],
  providers: [PortfolioItemService],
})
export class PortfolioItemModule {}
