
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
  Query,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/role-guard/roles.guard';
import { Roles } from '../auth/role-guard/roles.decorator';
import { Admin } from 'typeorm';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';
import { JwtPayloadDto } from '../common/interfaces/jwt-payload.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
  @UseGuards(JwtAuthGuard ,RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}



   @Get('profile')
     @Roles('customer', 'admin')
async  getProfile(@Req() req) {
    return req.user; // decoded JWT payload
    //  getProfile(@Req() req) {
    // return this.userService.getProfile(req.user); // ✅ user එ
  
}

  

  @Get()
  @Roles('admin')
  findAll(@Query('searchTerm') searchTerm: string) {
    return this.userService.findAll(searchTerm);
  }

  @Get("getbyid")
  @Roles('admin','customer')
  findOne( @Req()req:{user:JwtPayloadDto} ,id: string) {
    return this.userService.findOne(id,req.user );
  }
  @Put(':id')
  @Roles('admin','customer')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
const result =await  this.userService.update(id, updateUserDto);

return {
  message : "User updated successfully",
  data:result
}
  }


  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string) {
   const result =await this.userService.remove(id);

   if(result){
  return {message: "User deleted successfully"}
   }
  }
}
