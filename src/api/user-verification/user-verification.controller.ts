import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserVerificationService } from './user-verification.service';
import { CreateUserVerificationDto } from './dto/create-user-verification.dto';
import { UpdateUserVerificationDto } from './dto/update-user-verification.dto';

@Controller('user-verification')
export class UserVerificationController {
  constructor(private readonly userVerificationService: UserVerificationService) {}

  @Post()
  create(@Body() createUserVerificationDto: CreateUserVerificationDto) {
    return this.userVerificationService.create(createUserVerificationDto);
  }

  @Get()
  findAll() {
    return this.userVerificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userVerificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserVerificationDto: UpdateUserVerificationDto) {
    return this.userVerificationService.update(+id, updateUserVerificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userVerificationService.remove(+id);
  }
}
