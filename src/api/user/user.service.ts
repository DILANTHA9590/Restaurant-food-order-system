import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import argon2 from 'argon2';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(searchTerm: string): Promise<User[]> {
    searchTerm = searchTerm || '';

    const allUsers: User[] = await this.userRepository.find({
      where: [
        { name: ILike(`%${searchTerm}%`) },
        { email: ILike(`%${searchTerm}%`) },
      ],
    });

    return allUsers;
  }

  // get  user by
  async findOne(id: string, req: JwtPayload): Promise<User> {
    if (!req) {
      throw new UnauthorizedException('No user info found in request');
    }
    const userData: User | null = await this.userRepository.findOne({
      where: { id: req.sub },
    });

    if (!userData) {
      throw new NotFoundException('User not found');
    }

    return userData;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user: User | null = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    const existingUser = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!existingUser) {
      throw new NotFoundException('USer not found');
    }

    await this.userRepository.remove(existingUser);
  }

  async setUserBlock(req: JwtPayload, status: boolean) {
    if (!req) {
      throw new UnauthorizedException('No user info found in request');
    }

    const existingUser = await this.userRepository.findOne({
      where: { id: req?.sub },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    existingUser.isBlocked = !existingUser.isBlocked;

    await this.userRepository.save(existingUser);
    const newStatus= existingUser.isBlocked ? "Block"  : "Active"

    return{
      message :  `User ${newStatus} successfully`
    }

    
  }
}
