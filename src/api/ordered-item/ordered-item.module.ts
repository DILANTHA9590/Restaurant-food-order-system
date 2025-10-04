import { Module } from '@nestjs/common';
import { OrderedItemService } from './ordered-item.service';
import { OrderedItemController } from './ordered-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderedItem } from './entities/ordered-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderedItem])],
  controllers: [OrderedItemController],
  providers: [OrderedItemService],
})
export class OrderedItemModule {}
