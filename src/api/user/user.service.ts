import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {  ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import argon2 from 'argon2';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

  ) {}
  async create(createUserDto: CreateUserDto) {



  }



async loginUser() {


}


  async findAll(searchTerm: string) {
  searchTerm = searchTerm || "";

  const allUsers = await this.userRepository.find({
    where: [
      { name: ILike(`%${searchTerm}%`) },
      { email: ILike(`%${searchTerm}%`) },
    ],
  });

  return allUsers;
}


  async findOne(id:string ) {


    const user = await 

    
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
