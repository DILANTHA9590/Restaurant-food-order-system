import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'Dilantha Nayanajith',
    description: 'Full name of the user',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a valid string' })
  name: string;

  @ApiProperty({
    example: '+94771234567',
    description: 'Valid Sri Lankan phone number',
  })
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number must be a valid string' })
  @IsPhoneNumber('LK', {
    message:
      'Phone number must be a valid Sri Lankan number (e.g. +94771234567)',
  })
  phone: string;

  @ApiProperty({
    example: 'nayanagithdilantha@gmail.com',
    description: 'Unique email address of the user',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({
    example: 'StrongPassword123',
    description: 'Password for the user (min 6 characters)',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.CUSTOMER,
    description: 'User role in the system (admin, customer, or staff)',
  })
  @IsNotEmpty({ message: 'Role is required' })
  @IsEnum(UserRole, { message: 'Role must be one of: admin, customer, staff' })
  role: UserRole;
}
