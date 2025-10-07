import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVerification } from '../user-verification/entities/user-verification.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([User,UserVerification]),
   MailModule
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
