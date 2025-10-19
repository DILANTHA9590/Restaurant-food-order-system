import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/user-login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
   @ApiOperation({
    summary: 'Create new user',
    description: 'Register a new user with name, email, and password.',
  })
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
   @ApiOperation({
    summary: 'User login',
    description:
      'Authenticate user by verifying email and password credentials.',
  })
  loginUser(@Body() loginAuthDto: LoginUserDto) {
    return this.authService.loginUser(loginAuthDto);
  }

}
