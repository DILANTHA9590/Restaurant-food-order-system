import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking, BookingStatus } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Equal, In, LessThan, MoreThan, Not, Repository } from 'typeorm';
import { equal } from 'assert';
import { genarateId } from '../common/interfaces/utills/booking-number';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Table, TableStatus } from '../table/entities/table.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class BookingService {
  
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
     @InjectRepository(Table)
  private tableRepository: Repository<Table>,
  ) {}

async create(id:string,req:any ,createBookingDto: CreateBookingDto) {

const {sub}=req.user



const existingTable = await this.tableRepository.findOne({ where: { id } });
if(!existingTable){
  throw new NotFoundException("This Table id not found")
}


  const count = await this.bookingRepository.count({})
  const bookingId = genarateId("BKD",count)

  const {bookingDate,startTime ,endTime} = createBookingDto

  const startDateTime = new Date(`${bookingDate} ${startTime}`)
  const endDateTime = new Date(`${bookingDate} ${endTime}`)

  const newBooking = this.bookingRepository.create({
    ...createBookingDto,bookingId:bookingId,startDateTime:startDateTime,endDateTime:endDateTime
    ,table:{id} as Table,
    user:{id:sub} as User
  })



return   await this.bookingRepository.save(newBooking)
  // await this.tableRepository.save({
  //   ...existingTable,status:TableStatus.BOOKED
  // })




    








  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
