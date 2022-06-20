import { UserService } from './user.service';
import { Controller, Get, Post, Put, Body } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async listUsers() {
    return this.userService.findAll();
  }

  @Post()
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    delete user.password;
    return user;
  }
}
