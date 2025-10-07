import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserVerificationDto } from './create-user-verification.dto';
import { IsEmail, IsNumber } from 'class-validator';

export class UpdateUserVerificationDto  {

      @ApiProperty({ example: 'dilantha9590@gmail.com' })
      @IsEmail({}, { message: 'Please enter a valid email address.' })
      email: string;

      @ApiProperty({ example: '482913' })
      @IsNumber({},{ message: 'OTP must be a number.' })
      otp: Number;
}
