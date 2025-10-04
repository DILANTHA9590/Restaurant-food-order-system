import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderedItemService } from './ordered-item.service';
import { CreateOrderedItemDto } from './dto/create-ordered-item.dto';
import { UpdateOrderedItemDto } from './dto/update-ordered-item.dto';

@Controller('ordered-item')
export class OrderedItemController {
  constructor(private readonly orderedItemService: OrderedItemService) {}

  @Post()
  create(@Body() createOrderedItemDto: CreateOrderedItemDto) {
    // return this.orderedItemService.create(createOrderedItemDto);
  }

  @Get()
  findAll() {
    return this.orderedItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderedItemService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderedItemDto: UpdateOrderedItemDto,
  ) {
    return this.orderedItemService.update(+id, updateOrderedItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderedItemService.remove(+id);
  }
}
