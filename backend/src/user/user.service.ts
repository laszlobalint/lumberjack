import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../_entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['customers'] });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['customers'],
    });
  }
}
