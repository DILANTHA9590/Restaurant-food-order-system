import { Module } from '@nestjs/common';
import { UserVerificationService } from './user-verification.service';
import { UserVerificationController } from './user-verification.controller';
import { UserVerification } from './entities/user-verification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
   imports: [TypeOrmModule.forFeature([UserVerification])],
  controllers: [UserVerificationController],
  providers: [UserVerificationService],
})
export class UserVerificationModule {}
