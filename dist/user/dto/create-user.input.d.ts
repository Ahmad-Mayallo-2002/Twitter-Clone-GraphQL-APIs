import { Role } from 'src/assets/role.enum';
export declare class CreateUserInput {
    username: string;
    name?: string;
    email: string;
    password: string;
    image?: string;
    bio?: string;
    role: Role;
}
