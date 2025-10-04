import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Table } from '../table/entities/table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Table])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
