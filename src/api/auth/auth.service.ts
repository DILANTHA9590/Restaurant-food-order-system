import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email: email },
    });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashPassword = await argon2.hash(password);

    const newUser = this.userRepository.save({
      ...createUserDto,
      password: hashPassword,
    });

    return {
      message: 'User created successfully',
      user: newUser,
    };
  }

  async loginUser(loginUserDto: { email: string; password: string }) {
    const { email, password } = loginUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!existingUser) {
      throw new Error('User with this email does not exist');
    }

    const passwordMatch = await argon2.verify(existingUser.password, password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    const payLoad = {
      sub: existingUser?.id,
      email: existingUser?.email,
      role: existingUser?.role,
    };
    const token = jwt.sign(
      payLoad, // 👉 user data (id, email, roles, etc.)
      process.env.JWT_SECRET || 'default_secret', // 👉 secret key from .env file
      { expiresIn: '1h' }, // 👉 token will expire in 1 hour
    ); 



    return {
      message: 'Login successful',
      token: token,
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
