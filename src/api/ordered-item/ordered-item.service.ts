import { Injectable } from '@nestjs/common';
import { CreateOrderedItemDto } from './dto/create-ordered-item.dto';
import { UpdateOrderedItemDto } from './dto/update-ordered-item.dto';

@Injectable()
export class OrderedItemService {
  create(createOrderedItemDto: CreateOrderedItemDto) {
    return 'This action adds a new orderedItem';
  }

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
