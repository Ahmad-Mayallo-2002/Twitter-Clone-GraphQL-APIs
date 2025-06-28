import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "src/user/entities/user.entity";
import { CreateUserInput } from "src/user/dto/create-user.input";
import { AuthAccess } from "./entities/auth-access.entity";
import { LoginInput } from "./dto/create-auth.input";

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async signUp(@Args("input") input: CreateUserInput) {
    return this.authService.signUp(input);
  }

  @Mutation(() => AuthAccess, { name: "login" })
  async login(@Args("input") input: LoginInput) {
    return await this.authService.login(input);
  }
}
