//  @IsEnum(JournalStatus, { message: 'status must be a valid JournalStatus' })
//   @IsOptional()
//   status?: JournalStatus;
import { IsString, IsNotEmpty, IsInt, IsDate, IsOptional, IsEnum, Matches, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { BookingStatus } from '../entities/booking.entity';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  bookingId:string


  @IsString()
  @IsNotEmpty()
  customerContact: string;

  @IsInt()
  numberOfGuests: number;

  @IsDate()
  @Type(() => Date)   
  bookingDate: Date;

  @IsOptional()
  @IsString()
  specialRequest?: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({},{message :'invalid email'})
  email:string

  @IsNotEmpty({ message: 'Time is required' })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Time must be in HH:mm format (24-hour)',
  })
  startTime: string;


 @IsNotEmpty({ message: 'Time is required' })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Time must be in HH:mm format (24-hour)',
  })
  endTime: string;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}


 













