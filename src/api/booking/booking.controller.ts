import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { JwtPayloadDto } from '../common/interfaces/jwt-payload.dto';
import { RolesGuard } from '../auth/role-guard/roles.guard';
import { Cron } from '@nestjs/schedule';
@UseGuards(JwtAuthGuard ,RolesGuard)
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}


  @Post()
  QuckBooking(@Req()req:any , @Body() createBookingDto: CreateBookingDto) {
  
    return this.bookingService.quickBooking(  req, createBookingDto);
  }





  @Post(':id')
  create(@Param('id') id:string, @Req()req:any , @Body() createBookingDto: CreateBookingDto) {
  
  console.log(id)  // console.log(req.user.sub);
    return this.bookingService.create( id, req, createBookingDto);
  }

}
