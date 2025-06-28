import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserInput } from "src/user/dto/create-user.input";
import { LoginInput } from "./dto/create-auth.input";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    constructor(userRepo: Repository<User>, jwtService: JwtService);
    signUp(input: CreateUserInput): Promise<User>;
    validateUser(input: LoginInput): Promise<User>;
    generateToken(userId: number): Promise<string>;
    login(input: LoginInput): Promise<{
        token: string;
        id: number;
        role: import("../assets/role.enum").Role;
    }>;
    validateJwtUser(userId: number): Promise<{
        id: number | undefined;
        role: import("../assets/role.enum").Role | undefined;
    }>;
}
