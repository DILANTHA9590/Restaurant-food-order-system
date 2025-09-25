import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { JwtPayloadDto } from '../common/interfaces/jwt-payload.dto';
import { RolesGuard } from '../auth/role-guard/roles.guard';
@UseGuards(JwtAuthGuard ,RolesGuard)
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post(':id')
  create(@Param('id') id:string, @Req()req:any , @Body() createBookingDto: CreateBookingDto) {
  
  console.log(id)  // console.log(req.user.sub);
    return this.bookingService.create( id, req, createBookingDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
