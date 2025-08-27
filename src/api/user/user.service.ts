import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import argon2 from 'argon2';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

  ) {}
  async create(createUserDto: CreateUserDto) {

    
    const {email ,password} = createUserDto;


    const existingUser = await this.userRepository.findOne({where:{email:email}});
    if(existingUser){

      throw new Error('User with this email already exists');

    }

    const hashPassword = await argon2.hash(password);

    const newUser = this.userRepository.save({
      ...createUserDto,
      password:hashPassword
    });


    return{
      message : 'User created successfully',
      user : newUser
    }

  }



async loginUser(loginUserDto: { email: string; password: string; }) {

  const {email ,password} = loginUserDto;

  const existingUser = await this.userRepository.findOne({where:{email:email}});
  if(!existingUser){

    throw new Error('User with this email does not exist');

  }

  const passwordMatch = await argon2.verify(existingUser.password,password);

  if(!passwordMatch){

    throw new Error('Invalid password');

  }

  return{
    message : 'Login successful',
    user : existingUser
  }

}


  findAll() {






    
   
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
