import { Module } from '@nestjs/common';
import { UserVerificationService } from './user-verification.service';
import { UserVerificationController } from './user-verification.controller';
import { UserVerification } from './entities/user-verification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { MailModule } from '../mail/mail.module';

@Module({
   
  imports: [TypeOrmModule.forFeature([UserVerification, User]),
     MailModule
],

  controllers: [UserVerificationController],
  providers: [UserVerificationService],
})
export class UserVerificationModule {}
