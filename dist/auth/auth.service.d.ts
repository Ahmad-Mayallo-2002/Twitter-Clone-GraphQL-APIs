import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { LoginInput } from './dto/create-auth.input';
import { UserSendMail } from './dto/send-mail.input';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    signUp(input: CreateUserInput): Promise<User>;
    validateUser(input: LoginInput): Promise<User>;
    getUserAndSendCode(input: UserSendMail): Promise<string>;
    compareCode(currentCode: string, userCode: string): Promise<boolean>;
    updatePassword(newPassword: string, confirmNewPassowrd: string, email: string): Promise<boolean>;
    generateToken(userId: number): Promise<string>;
    login(input: LoginInput): Promise<{
        token: string;
        role: import("../assets/role.enum").Role;
        id: number;
    }>;
    validateJwt(userId: number): Promise<{
        id: number | undefined;
        role: import("../assets/role.enum").Role | undefined;
    }>;
}
