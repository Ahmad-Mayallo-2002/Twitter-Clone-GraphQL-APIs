import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { compare, hash } from 'bcryptjs';
import { LoginInput } from './dto/create-auth.input';
import {} from 'nodemailer';
import { sendMail } from './transport';
import { UserSendMail } from './dto/send-mail.input';
import { log } from 'console';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './types/payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(input: CreateUserInput) {
    const user = await this.userRepo.findOneBy({ email: input.email });
    if (user) throw new Error('This Email is already exist!');
    ['username', 'email', 'password'].forEach((val) => {
      if (!input[val]) throw new NotFoundException(`${val} is required`);
    });
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

    return user;
  }

  async getUserAndSendCode(input: UserSendMail) {
    const user = await this.userRepo.findOneBy({ email: input.email });
    if (!user) throw new UnauthorizedException('Invalid Email!');

    const code = await sendMail(user.email);
    return code;
  }

  async compareCode(currentCode: string, userCode: string) {
    return currentCode === userCode;
  }

  async updatePassword(
    newPassword: string,
    confirmNewPassowrd: string,
    email: string,
  ) {
    if (!newPassword || !confirmNewPassowrd)
      throw new Error('Passwords are Required');
    if (newPassword !== confirmNewPassowrd)
      throw new Error('Passwords must be equal');
    await this.userRepo.update(
      { email },
      { password: await hash(newPassword, 10) },
    );
    return true;
  }

  async generateToken(userId: number) {
    const payload: Payload = {
      sub: {
        userId,
      },
    };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async login(input: LoginInput) {
    const user = await this.validateUser(input);
    const token = await this.generateToken(user?.id);

    return {
      token,
      role: user?.role,
      id: user?.id,
    };
  }

  async validateJwt(userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    const jwtValidate = {
      id: user?.id,
      role: user?.role,
    };
    return jwtValidate;
  }
}
