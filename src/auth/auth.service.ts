import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { compare, hash } from 'bcryptjs';
import { LoginInput } from './dto/create-auth.input';

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

  async validateUser(input: LoginInput) {
    const user = await this.userRepo.findOneBy({ email: input.email });
    if (!user) throw new UnauthorizedException('Invalid Email!');

    const comparePassword = await compare(input.password, user.password);
    if (!comparePassword) throw new UnauthorizedException('Invalid Password!');
  }

  async generateToken() {}

  async login(input: LoginInput) {}
}
