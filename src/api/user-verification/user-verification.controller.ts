import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserVerificationService } from './user-verification.service';
import { CreateUserVerificationDto } from './dto/create-user-verification.dto';
import { UpdateUserVerificationDto } from './dto/update-user-verification.dto';

@Controller('user-verification')
export class UserVerificationController {
  constructor(private readonly userVerificationService: UserVerificationService) {}

  @Post()
  create(@Body()updateUserVerificationDto : UpdateUserVerificationDto) {
    return this.userVerificationService.verifyOtp(updateUserVerificationDto);
  }

  
}
