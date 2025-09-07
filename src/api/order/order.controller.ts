import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/role-guard/roles.guard';
import { JwtPayloadDto } from '../common/interfaces/jwt-payload.dto';

@Controller('order')
@UseGuards(JwtAuthGuard,RolesGuard)

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Req()req:{user:JwtPayloadDto} ,@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(req.user, createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
