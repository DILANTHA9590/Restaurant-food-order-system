import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { JwtPayloadDto } from '../common/interfaces/jwt-payload.dto';
import { RolesGuard } from '../auth/role-guard/roles.guard';
import { Cron } from '@nestjs/schedule';
import { Roles } from '../auth/role-guard/roles.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @Roles('admin', 'customer')
  QuckBooking(@Req() req: any, @Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.quickBooking(req, createBookingDto);
  }

  @Post('active')
  @Cron('0 * * * *')
  setAvialbleExpiredBooking() {
    return this.bookingService.setAvialbleExpiredBooking();
  }

  @Post(':id')
  @Roles('admin', 'customer')
  create(
    @Param('id') id: string,
    @Req() req: any,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    return this.bookingService.create(id, req, createBookingDto);
  }
}
