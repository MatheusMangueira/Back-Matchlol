import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    const user = await this.userRepository.find();
    const sanitizeUser = user.reduce((acc, item) => {
      delete item.email;
      delete item.password;

      return [...acc, item];
    }, []);

    return sanitizeUser;
  }

  async findOneOrFail(conditions: any): Promise<UserEntity> {
    try {
      return await this.userRepository.findOneOrFail({ where: conditions });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
