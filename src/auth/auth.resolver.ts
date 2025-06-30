import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { UserSendMail } from './dto/send-mail.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  async hello(@Args('email') email: string) {
    return email;
  }

  @Mutation(() => User)
  async signUp(@Args('input') input: CreateUserInput) {
    return this.authService.signUp(input);
  }

  @Mutation(() => String, { name: 'getUserAndSendCode' })
  async getUserAndSendCode(@Args('input') input: UserSendMail) {
    return await this.authService.getUserAndSendCode(input);
  }

  @Mutation(() => Boolean, { name: 'compareCode' })
  async compareCode(
    @Args('currentCode') currentCode: string,
    @Args('userCode') userCode: string,
  ) {
    return await this.authService.compareCode(currentCode, userCode);
  }

  @Mutation(() => Boolean, { name: 'updatePassword' })
  async updatePassword(
    @Args("newPassword") newPassword: string,
    @Args("confirmPassword") confirmNewPassowrd: string,
    @Args("email") email: string,
  ) {
    return await this.authService.updatePassword(newPassword, confirmNewPassowrd, email);
  }
}
