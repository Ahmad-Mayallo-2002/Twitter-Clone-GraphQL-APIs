import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'getUsers' })
  async findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'getUser' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return this.userService.update(userId, input);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
