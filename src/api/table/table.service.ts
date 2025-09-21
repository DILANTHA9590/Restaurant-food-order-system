import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from '../booking/entities/booking.entity';
import { Table } from './entities/table.entity';
import { Repository } from 'typeorm';
import { genarateId } from '../common/interfaces/utills/booking-number';

@Injectable()
export class TableService {


   constructor(
      @InjectRepository(Table)
      private tableRepository: Repository<Table>,
    ) {}

 async create(createTableDto: CreateTableDto) {
 

  const count = await this.tableRepository.count({})
  if(count===0) count +1
  const tableId = genarateId("TBL",count);

  const tableData = await this.tableRepository.save({...createTableDto,tableId:tableId})

  return{
    message:"Table created succsessfully",
    statusCode:HttpStatus.CREATED,
  }

  








  
  }

  findAll() {
    return `This action returns all table`;
  }

  findOne(id: number) {
    return `This action returns a #${id} table`;
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`;
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}
