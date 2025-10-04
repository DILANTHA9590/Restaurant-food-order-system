import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsDate,
  IsOptional,
  IsEnum,
  Matches,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookingStatus } from '../entities/booking.entity';

export class CreateBookingDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the customer',
  })
  @IsString({ message: 'Customer name must be a string' })
  @IsNotEmpty({ message: 'Customer name is required' })
  customerName: string;

  @ApiProperty({ example: 'BK12345', description: 'Unique booking ID' })
  @IsString({ message: 'Booking ID must be a string' })
  bookingId: string;

  @ApiProperty({
    example: '+94112233445',
    description: 'Customer contact number',
  })
  @IsString({ message: 'Customer contact must be a string' })
  @IsNotEmpty({ message: 'Customer contact is required' })
  customerContact: string;

  @ApiProperty({ example: 4, description: 'Number of guests' })
  @IsInt({ message: 'Number of guests must be an integer' })
  numberOfGuests: number;

  @ApiProperty({
    example: '2025-09-20',
    description: 'Booking date (YYYY-MM-DD)',
  })
  @IsString({ message: 'Special request must be a string' })
  bookingDate: string;

  @ApiPropertyOptional({
    example: 'Vegetarian meal requested',
    description: 'Special request if any',
  })
  @IsOptional()
  @IsString({ message: 'Special request must be a string' })
  specialRequest?: string;

  @ApiProperty({
    example: 'customer@example.com',
    description: 'Customer email address',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: '18:30',
    description: 'Start time (HH:mm 24-hour format)',
  })
  @IsNotEmpty({ message: 'Start time is required' })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Start time must be in HH:mm format (24-hour)',
  })
  startTime: string;

  @ApiProperty({
    example: '20:30',
    description: 'End time (HH:mm 24-hour format)',
  })
  @IsNotEmpty({ message: 'End time is required' })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'End time must be in HH:mm format (24-hour)',
  })
  endTime: string;

  @ApiPropertyOptional({
    enum: BookingStatus,
    description: 'Current booking status',
    default: BookingStatus.CONFIRMED,
  })
  @IsOptional()
  @IsEnum(BookingStatus, { message: 'Status must be a valid BookingStatus' })
  status?: BookingStatus;
}
