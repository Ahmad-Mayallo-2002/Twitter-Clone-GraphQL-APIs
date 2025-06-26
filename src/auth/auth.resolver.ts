import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserInput } from 'src/user/dto/create-user.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  async hello() {
    return 'Hello, World!';
  }

  @Mutation(() => User)
  async signUp(@Args('input') input: CreateUserInput) {
    return this.authService.signUp(input);
  }
}
