import { Module } from '@nestjs/common';
import { OrderedItemService } from './ordered-item.service';
import { OrderedItemController } from './ordered-item.controller';

@Module({
  controllers: [OrderedItemController],
  providers: [OrderedItemService],
})
export class OrderedItemModule {}
