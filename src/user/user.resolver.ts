import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/auth.guard';
import { log } from 'console';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtType } from 'src/auth/types/jwtType';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'getUsers' })
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'getUser' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: 'updateUser' })
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @CurrentUser() user: JwtType,
  ) {
    return this.userService.update(user.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: 'deleteUser' })
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
