import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';
import { User } from '../user/entities/user.entity';
import { OrderedItem } from '../ordered-item/entities/ordered-item.entity';
import { Menuitem } from '../menuitem/entities/menuitem.entity';

@Injectable()
export class OrderService {


  constructor(  
    
  @InjectRepository(Order)
  private readonly orderRepository:Repository<Order>,

    @InjectRepository(OrderedItem)
    private readonly orderedItemRepository: Repository<OrderedItem>,
    
    @InjectRepository(Menuitem)
    private readonly menuItemRepository: Repository<Menuitem>,

  ) {}
  

  async create(req:JwtPayload ,createOrderDto: CreateOrderDto) {

    const {sub}= req
    
  const {orderedItems}= createOrderDto

  const count = await this.orderRepository.count()
  const randomSixDigit = Math.floor(100000 + Math.random() * 90000000);
  const orderId ="ORD" + randomSixDigit.toString() + count.toString()

  const newOrder = this.orderRepository.create({...createOrderDto,orderId:orderId})

const savedOrder = await this.orderRepository.save({
  ...newOrder,
  userId:{id:sub} as User
})
  

     let allProductTotal = 0
     let  menuItemQtyTotal = 0


  for(const item of orderedItems){


    const findItem = await this.menuItemRepository.findOne({where:{id:item.id}})

    if(!findItem){
      continue
    }

     menuItemQtyTotal = item.quantity * findItem.lastPrice
     allProductTotal = allProductTotal + menuItemQtyTotal

    const setOrderItem = {

      productName :findItem.name,
      lastprice : findItem.lastPrice,
      total : menuItemQtyTotal,
      image : findItem.image,
      quantity : item.quantity

    }

    const newOrderedItem = this.orderedItemRepository.create({
      ...setOrderItem,
      order:{id:savedOrder.id} as Order,
      menuitem:{id:findItem.id} as Menuitem
    })

    await this.orderedItemRepository.save(newOrderedItem)

}

  await this.orderRepository.update(savedOrder.id, {
     totalPrice : allProductTotal
    })    
    



    return {
      order : await this.orderRepository.findOne({where:{id:savedOrder.id}}),
      orderedItems : await this.orderedItemRepository.find({where:{order:{id:savedOrder.id}}}),

    }

  


  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
