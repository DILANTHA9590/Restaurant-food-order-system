import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking, BookingStatus } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Equal, ILike, In, LessThan, MoreThan, Not, Repository } from 'typeorm';
import { equal } from 'assert';
import { genarateId } from '../common/interfaces/utills/booking-number';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Table, TableStatus } from '../table/entities/table.entity';
import { User } from '../user/entities/user.entity';
import { STATUS_CODES } from 'http';

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


  await this.bookingRepository.save(newBooking)
  await this.tableRepository.save({
    ...existingTable,status:TableStatus.BOOKED
  })


return{
  message:"Table Bokking successfully",
  statusCode :HttpStatus.CREATED
}
  }


  
async getAllActiveBooking(
  searchTerm: string,
  page: number = 1,
  limit: number = 10,
) {
  const [data, total] = await this.bookingRepository.findAndCount({
    where: [
      { id: ILike(`%${searchTerm}%`), status: BookingStatus.COMPLETED },
      { bookingId: ILike(`%${searchTerm}%`), status: BookingStatus.COMPLETED },
      { table: { tableId: ILike(`%${searchTerm}%`) }, status: BookingStatus.COMPLETED },
    ],
    relations: ['table'],
    skip: (page - 1) * limit,
    take: limit,// optional ordering,
    order:{createdAt:'DESC'}
  });

  return {
    message: 'Active bookings retrieved successfully',
    statusCode: HttpStatus.OK,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}





async  quickBooking(){



  

}

  

  
}
