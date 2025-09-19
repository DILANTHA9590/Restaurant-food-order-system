import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking, BookingStatus } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Equal, In, LessThan, MoreThan, Not, Repository } from 'typeorm';
import { equal } from 'assert';

@Injectable()
export class BookingService {
  
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}


  async create(createBookingDto: CreateBookingDto) {

 

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
