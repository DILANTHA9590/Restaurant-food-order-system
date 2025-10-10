import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserVerificationDto } from './dto/create-user-verification.dto';
import { UpdateUserVerificationDto } from './dto/update-user-verification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserVerification } from './entities/user-verification.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserVerificationService {
 constructor(
    @InjectRepository(UserVerification)
    private readonly userVerifyRepository:Repository<UserVerification>,
       @InjectRepository(User)
        private readonly userRepository: Repository<User>,
         private readonly mailService: MailService,
  ) {}

async verifyOtp( dto: UpdateUserVerificationDto) {

const  checkIsVerify= await this.userRepository.findOne({where:{email:dto.email}})

if(checkIsVerify?.isVerified){
  throw new BadRequestException("This email own user already verify")
}


  const existing_email = await this.userVerifyRepository.find({
  where: { email: dto.email },
  order: { createdAt: 'DESC' },
});

if(existing_email.length == 0){
   throw new BadRequestException('No OTP found for this email. Please Enter correct email.');
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


async resendOtp(dto: UpdateUserVerificationDto) {
const  checkIsVerify= await this.userRepository.findOne({where:{email:dto.email}})
const nowTime = new Date()

if(checkIsVerify?.isVerified){
  throw new BadRequestException("This email own user already verify")
}

 const existing_email = await this.userVerifyRepository.find({
 where: { email: dto.email },
 order: { createdAt: 'DESC' },
  
  })

if(existing_email.length==0){
  throw new NotFoundException("Email not found")
}

if(existing_email[0].expireTime  > nowTime){
  throw new BadRequestException("Please wait before requesting another OTP")
}

  const otp = Math.floor(10000 + Math.random() * 90000);
  await this.userVerifyRepository.save({
  email:dto.email,
  otp:otp,
  expireTime: new Date(nowTime.getTime() + 2 * 60000) // 2 minutes from now
    })


 await this.mailService.sendOtpEmail(dto.email,otp)


 return{
   statusCode:HttpStatus.OK,
   message:"Email resend succuessfully"

 }



}




}