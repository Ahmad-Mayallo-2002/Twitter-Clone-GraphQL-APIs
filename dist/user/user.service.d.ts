import { NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | NotFoundException>;
    update(id: number, input: UpdateUserInput): Promise<true | NotFoundException>;
    remove(id: number): Promise<true | NotFoundException>;
}
