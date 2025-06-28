import { AuthService } from "./auth.service";
import { User } from "src/user/entities/user.entity";
import { CreateUserInput } from "src/user/dto/create-user.input";
import { LoginInput } from "./dto/create-auth.input";
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(input: CreateUserInput): Promise<User>;
    login(input: LoginInput): Promise<{
        token: string;
        id: number;
        role: import("../assets/role.enum").Role;
    }>;
}
