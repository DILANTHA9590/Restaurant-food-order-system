import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

  const {bookingDate,startTime ,endTime} = createBookingDto

  const today  = new Date()
  const tommorow= new Date(today)
  tommorow.setDate(today.getDate() +1)
  tommorow.setHours(23, 59, 59, 999); 
  const requestDate = new Date(bookingDate);
  console.log((requestDate));
 

  
  const startDateTime = new Date(`${bookingDate} ${startTime}`)
  const endDateTime = new Date(`${bookingDate} ${endTime}`)



  const count = await this.bookingRepository.count({})
  const bookingId = genarateId("BKD",count)

  if(requestDate<today){
       throw new BadRequestException(
      `Invalid booking data You cannot book for a past date.`
    );
  }

  if(requestDate>tommorow){
    throw new BadRequestException("You cant Book table more than onme day")
  }





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


  searchTerm = searchTerm || ""
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


async getAllExpiredBooking(  searchTerm: string,

  page: number = 1,
  limit: number = 10,){



const [data, total] = await this.bookingRepository.findAndCount({
    where: [
      { id: ILike(`%${searchTerm}%`), status: BookingStatus.EXPIRED },
      { bookingId: ILike(`%${searchTerm}%`), status: BookingStatus.EXPIRED },
      { table: { tableId: ILike(`%${searchTerm}%`) }, status: BookingStatus.EXPIRED },
    ],
    relations: ['table'],
    skip: (page - 1) * limit,
    take: limit,// optional ordering
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
    

async getBookingByUserId(req:any){
  const {sub}= req.user

  const booking = await this.bookingRepository.find({where:{user:{id:sub}},
    order:{id:'DESC'}
  })

  if(booking.length==0){
    return {
      message :"Booking not found",
      statusCode:200,
      data:booking
    }
  }

return{
   message :"Booking not found",
      statusCode:200,
      data:booking

}

}


async  quickBooking(req:any,createBookingDto:CreateBookingDto){




const {bookingDate,startTime,endTime} =  createBookingDto
const today  = new Date()
  const tommorow= new Date(today)
  tommorow.setDate(today.getDate() +1)
  tommorow.setHours(23, 59, 59, 999); 
  const requestDate = new Date(bookingDate);
  console.log((requestDate));
 
  const startDateTime = new Date(`${bookingDate} ${startTime}`)
  const endDateTime = new Date(`${bookingDate} ${endTime}`)

  if(requestDate<today){
       throw new BadRequestException(
      `Invalid booking data You cannot book for a past date.`
    );
  }

  if(requestDate>tommorow){
    throw new BadRequestException("You cant Book table more than onme day")
  }


const table = await this.tableRepository.find({where:{status:TableStatus.AVAILABLE}})


  if (table.length==0) {
    throw new BadRequestException("No available tables at the moment.");
  }
const availbleTable = table[0]


  const count = await this.bookingRepository.count({})
  const bookingId = genarateId("BKD",count)

const {sub}=req.user
const newBooking = this.bookingRepository.create({
    ...createBookingDto,bookingId:bookingId,startDateTime:startDateTime,endDateTime:endDateTime
    ,table:{id:availbleTable.id} as Table,
    user:{id:sub} as User
  })
  await this.bookingRepository.save(newBooking)
  await this.tableRepository.save({
    ...availbleTable,status:TableStatus.BOOKED
  })


return{
  message:"Table Booking successfully",
  statusCode :HttpStatus.CREATED
}

}


async setAvialbleExpiredBooking(){

const today = new Date()

const expiredBooking = await this.bookingRepository.find({where :{endDateTime:LessThan(today),
  status:BookingStatus.COMPLETED
}})

if(expiredBooking.length==0){
   console.log("⏳ No expired bookings found");
    return;
}


 for(const booking of expiredBooking ){
  const {table} = booking

//set Expired Booking Status
 booking.status=BookingStatus.EXPIRED
 await this.bookingRepository.save(booking);

  //set availble expired booking table  
if (booking.table) {
      booking.table.status = TableStatus.AVAILABLE;
      await this.tableRepository.save(booking.table);
    }


 console.log(`✅ Booking ${booking.id} expired → Table ${booking.table.id} released`);

 }
}



async deleteBooking(id:string){

  const bookingId= await this.bookingRepository.findOne({where:{id:id}})

}

  
}