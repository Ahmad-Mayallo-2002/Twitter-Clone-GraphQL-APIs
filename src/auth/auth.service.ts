import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async signUp(input: CreateUserInput) {
    const newUser = this.userRepo.create({
      ...input,
      password: await hash(input.password, 10),
    });
    return await this.userRepo.save(newUser);
  }
}
