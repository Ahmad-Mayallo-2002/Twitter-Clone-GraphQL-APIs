import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) return new NotFoundException('This User is not Found!');
    return user;
  }

  async update(id: number, input: UpdateUserInput) {
    const user = await this.userRepo.preload({
      ...input,
      id,
    });
    if (!user) return new NotFoundException('This User is not Found!');
    return true;
  }

  async remove(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) return new NotFoundException('User is not Found!');
    await this.userRepo.delete(id);
    return true;
  }
}
