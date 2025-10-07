import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserVerificationDto } from './dto/create-user-verification.dto';
import { UpdateUserVerificationDto } from './dto/update-user-verification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserVerification } from './entities/user-verification.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class UserVerificationService {
 constructor(
    @InjectRepository(UserVerification)
    private readonly userVerifyRepository:Repository<UserVerification>,
       @InjectRepository(User)
        private readonly userRepository: Repository<User>,
  ) {}

async verifyOtp( dto: UpdateUserVerificationDto) {


  const existing_email = await this.userVerifyRepository.find({
  where: { email: dto.email },
  order: { createdAt: 'DESC' },
});

if(existing_email.length == 0){
   throw new BadRequestException('No OTP found for this email. Please request a new one.');
}
const [verifyRecord]= existing_email

if(verifyRecord.otp !=  dto.otp){

throw new BadRequestException('Invalid OTP. Please check and try again.');

}
  const now = new Date();
  if (verifyRecord.expireTime && verifyRecord.expireTime < now) {
    throw new BadRequestException('OTP has expired. Please request a new one.');
  }

await this.userRepository.update({email:dto.email} , {isVerified:true})


return{
  statusCode:HttpStatus.OK,
  message :"User verification  successfullly"
}


  

  
}

}