import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserInput } from "src/user/dto/create-user.input";
import { compare, hash } from "bcryptjs";
import { LoginInput } from "./dto/create-auth.input";
import { JwtService } from "@nestjs/jwt";
import { Payload } from "src/assets/types";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService
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
    if (!user) throw new UnauthorizedException("Invalid Email!");

    const comparePassword = await compare(input.password, user.password);
    if (!comparePassword) throw new UnauthorizedException("Invalid Password!");

    return user;
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
    const user: User = await this.validateUser(input);
    const token = await this.generateToken(user.id);
    return {
      token,
      id: user.id,
      role: user.role,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    const jwtValidate = {
      id: user?.id,
      role: user?.role,
    };
    return jwtValidate;
  }
}
