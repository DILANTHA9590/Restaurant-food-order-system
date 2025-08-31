import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/role-guard/roles.guard';
import { Roles } from '../auth/role-guard/roles.decorator';
import { Admin } from 'typeorm';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard ,RolesGuard)


   @Get('profile')
     @Roles('customer', 'admin')
  getProfile(@Req() req) {
    return req.user; // decoded JWT payload
    //  getProfile(@Req() req) {
    // return this.userService.getProfile(req.user); // ✅ user එ
  
}

  

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
