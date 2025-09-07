import { PartialType } from '@nestjs/swagger';
import { CreateOrderedItemDto } from './create-ordered-item.dto';

export class UpdateOrderedItemDto extends PartialType(CreateOrderedItemDto) {}
