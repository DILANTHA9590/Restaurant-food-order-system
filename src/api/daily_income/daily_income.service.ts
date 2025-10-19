import { Injectable, BadRequestException, NotFoundException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { DailyIncome } from './entities/daily_income.entity';
import { Order } from '../order/entities/order.entity';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import { UpdateDailyIncomeDto } from './dto/update-daily-income.dto';

@Injectable()
export class DailyIncomeService {
  constructor(
    @InjectRepository(DailyIncome)
    private readonly dailyIncomeRepository: Repository<DailyIncome>,
     @InjectRepository(Order)
    private readonly orderRepository:Repository<Order>,
  ) {}

  async create() {
    const today = new Date();
    const startTime = new Date(); 
    startTime.setHours(0, 0, 0, 0);
    const endTime = new Date(); 
    endTime.setHours(23, 59, 59, 999);
    
const orders: CreateOrderDto[]= await this.orderRepository.find({where:{createdAt:Between(startTime,endTime)}})
if(orders.length==0){
  return console.log("No today Orders Found")
}

const totalIncome = orders.reduce((sum,l)=> sum + (l.totalPrice || 0), 0)


const saveddailyIncome= this.dailyIncomeRepository.create({
    date: today.toISOString().split('T')[0],
    totalIncome:totalIncome,
    totalOrders:orders.length,    
  })

  await this.dailyIncomeRepository.save(saveddailyIncome)

  return console.log("daily income saved succesfully")

  }

  async findAll() {
    return this.dailyIncomeRepository.find({ order: { date: 'DESC' } });
  }

  async findOne(id: string) {
    const dailyIncome = await this.dailyIncomeRepository.findOne({ where: { id } });
    if (!dailyIncome) {
      throw new NotFoundException('Daily income not found');
    }
    return dailyIncome;
  }

  async update(id: string, updateDailyIncomeDto: UpdateDailyIncomeDto) {
    const result = await this.dailyIncomeRepository.update(id, updateDailyIncomeDto);
    if (result.affected === 0) {
      throw new NotFoundException('Daily income not found');
    }
    return this.dailyIncomeRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const result = await this.dailyIncomeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Daily income not found');
    }
    return { message: 'Daily income deleted successfully' };
  }
}
