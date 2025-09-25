import { HttpCode, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ILike, Repository } from 'typeorm';
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

    
  console.log("sub",req)
    
  const {orderedItems}= createOrderDto

  const count = await this.orderRepository.count()
  const randomSixDigit = Math.floor(100000 + Math.random() * 90000000);
  const orderId ="ORD-" + randomSixDigit.toString() + count.toString()

  const newOrder = this.orderRepository.create({...createOrderDto,orderId:orderId,
      user:{id:sub} as User
  })

const savedOrder = await this.orderRepository.save(newOrder)
  


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



async getAllOrders(searchTerm:string,page:number ,limit:number) {

  searchTerm =searchTerm|| ""
  page= page || 1
  limit = limit || 10

 const [data, total] = await this.orderRepository.findAndCount({
  where: { orderId: ILike(`%${searchTerm}%`) },
  skip: (page - 1) * limit,
  take: limit,
  order: { createdAt: "DESC" },
  relations:["orderedItems"]


});

 return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    statusCode: HttpStatus.OK
  };

  }

 async getOrdersByCustomerId(searchTerm:string, page:number , limit:number ,req:JwtPayload){
 const {sub}= req
    
searchTerm = searchTerm || ""
  page = page || 1
  limit = limit || 10

 const [data, total] = await this.orderRepository.findAndCount({

  where: {
       user:{id:sub},
     orderId: ILike(`%${searchTerm}%`),

 },
  

  skip: (page - 1) * limit,
  take: limit,
  order: { createdAt: "DESC" },
  relations:["orderedItems","user"]


});

 return {
  
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    statusCode: HttpStatus.OK
  };

  }



    async deleteAllOrders(){

      await this.orderRepository.clear();
      return{
         message: "All orders deleted successfully",
        statusCode: HttpStatus.OK
      }

    }
  
  async deleteOrderUsingId(id:string){


    const existingOrder= await this.orderRepository.findOne({where:{id:id}})

    if(!existingOrder){

      throw new NotFoundException("NO order found this id ")

    }

    await this.orderRepository.remove(existingOrder)

    return{
      message:"order deleted successfully",
      statusCode:HttpStatus.OK,
    }


  }


}
