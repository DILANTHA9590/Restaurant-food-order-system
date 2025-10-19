import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserVerificationService } from './user-verification.service';
import { CreateUserVerificationDto } from './dto/create-user-verification.dto';
import { UpdateUserVerificationDto } from './dto/update-user-verification.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

ApiTags('user verifications api')
@Controller('user-verification')
export class UserVerificationController {
  constructor(private readonly userVerificationService: UserVerificationService) {}

  @Post()
   @ApiOperation({
    summary: 'Verify user OTP',
    description:
      'Validate the OTP sent to the user’s email address and activate the account if valid.',
  })
  verifyOtp(@Body()createUserVerificationDto : CreateUserVerificationDto) {
    return this.userVerificationService.verifyOtp(createUserVerificationDto);
  }

  @Post('resend')
   @ApiOperation({
    summary: 'Resend OTP to user email',
    description:
      'Re-send a new OTP code to the user’s registered email address for verification purposes.',
  })
  resendOtp(@Body()updateUserVerificationDto : UpdateUserVerificationDto) {
    return this.userVerificationService.resendOtp(updateUserVerificationDto);
  }


  
}
