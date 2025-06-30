import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { UserSendMail } from './dto/send-mail.input';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    hello(email: string): Promise<string>;
    signUp(input: CreateUserInput): Promise<User>;
    getUserAndSendCode(input: UserSendMail): Promise<string>;
    compareCode(currentCode: string, userCode: string): Promise<boolean>;
    updatePassword(newPassword: string, confirmNewPassowrd: string, email: string): Promise<boolean>;
}
