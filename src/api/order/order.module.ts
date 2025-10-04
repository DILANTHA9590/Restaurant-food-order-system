import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Menuitem } from '../menuitem/entities/menuitem.entity';
import { OrderedItem } from '../ordered-item/entities/ordered-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Menuitem, OrderedItem])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
