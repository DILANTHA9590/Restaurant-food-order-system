import { Injectable } from '@nestjs/common';
import { CreateOrderedItemDto } from './dto/create-ordered-item.dto';
import { UpdateOrderedItemDto } from './dto/update-ordered-item.dto';
import { OrderedItem } from './entities/ordered-item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderedItemService {
  constructor(
    @InjectRepository(OrderedItem)
    private readonly orderedItemRepository: Repository<OrderedItem>,
  ) {}


}
