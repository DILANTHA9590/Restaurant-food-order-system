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

  findAll() {
    return `This action returns all orderedItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderedItem`;
  }

  update(id: number, updateOrderedItemDto: UpdateOrderedItemDto) {
    return `This action updates a #${id} orderedItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderedItem`;
  }
}
