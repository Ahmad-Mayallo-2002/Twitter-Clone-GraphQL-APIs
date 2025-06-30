import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | import("@nestjs/common").NotFoundException>;
    updateUser(input: UpdateUserInput, userId: number): Promise<true | import("@nestjs/common").NotFoundException>;
    removeUser(id: number): Promise<true | import("@nestjs/common").NotFoundException>;
}
