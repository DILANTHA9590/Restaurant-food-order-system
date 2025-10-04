import { Injectable } from '@nestjs/common';
import { CreateUserVerificationDto } from './dto/create-user-verification.dto';
import { UpdateUserVerificationDto } from './dto/update-user-verification.dto';

@Injectable()
export class UserVerificationService {
  create(createUserVerificationDto: CreateUserVerificationDto) {
    return 'This action adds a new userVerification';
  }

  findAll() {
    return `This action returns all userVerification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userVerification`;
  }

  update(id: number, updateUserVerificationDto: UpdateUserVerificationDto) {
    return `This action updates a #${id} userVerification`;
  }

  remove(id: number) {
    return `This action removes a #${id} userVerification`;
  }
}
