import { IsEmail, IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserVerificationDto {
  @ApiProperty({ example: 'dilantha9590@gmail.com' })
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @ApiProperty({ example: '482913' })
  @IsString({ message: 'OTP must be a valid string.' })
  otp: string;

  @ApiProperty({ example: '2025-10-08T23:59:00.000Z' })
  @IsNotEmpty({ message: 'Expire time is required.' })
  @IsDateString({}, { message: 'Expire time must be a valid date format (ISO string).' })
  expireTime: Date;
}
