import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, Search } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/role-guard/roles.guard';
import { JwtPayloadDto } from '../common/interfaces/jwt-payload.dto';
import { Roles } from '../auth/role-guard/roles.decorator';

@Controller('order')
@UseGuards(JwtAuthGuard,RolesGuard)

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
    @Roles('admin','customer')
  create(@Req()req:{user:JwtPayloadDto} ,@Body() createOrderDto: CreateOrderDto) {

    return this.orderService.create(req.user, createOrderDto);
  }
  
  
  @Get()
  @Roles('admin')
  getAllOrders(@Query("serachTerm") searchTerm:string,@Query("page") page:number,@Query("limit") limit:number) {
    return this.orderService.getAllOrders(searchTerm,page,limit);
  }

  @Get("id")
  @Roles('admin','customer')
  findOne( @Req()req:{user:JwtPayloadDto}, @Query("searchTerm") searchTerm:string ,@Query()page:number ,@Query()limit:number) {
    return this.orderService.getOrdersByCustomerId(searchTerm,page,limit,req.user);
  }

  @Roles('admin','customer')
  @Delete(':id')
  deleteOrderUsingId(@Param('id') id: string) {
    return this.orderService.deleteOrderUsingId(id);
  }

  @Roles('admin')
  @Delete("delete/all")
  deleteAllOrders() {
    return this.orderService.deleteAllOrders();
  }

}
