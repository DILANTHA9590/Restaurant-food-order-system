import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserVerificationDto } from './create-user-verification.dto';
import { IsEmail, IsNumber } from 'class-validator';

export class UpdateUserVerificationDto  {

      @ApiProperty({ example: 'nayanagithdilantha@gmail.com' })
      @IsEmail({}, { message: 'Please enter a valid email address.' })
      email: string;


}
