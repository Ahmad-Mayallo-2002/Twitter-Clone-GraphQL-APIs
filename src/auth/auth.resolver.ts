import { Resolver, Query, Mutation, Args, Scalar } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { UserSendMail } from './dto/send-mail.input';
import { LoginInput } from './dto/create-auth.input';
import { JwtAuth } from './entities/auth.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { join } from 'path';
import { createWriteStream } from 'fs';
import { log } from 'console';

export class UploadScalar {}

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
    @Args('newPassword') newPassword: string,
    @Args('confirmPassword') confirmNewPassowrd: string,
    @Args('email') email: string,
  ) {
    return await this.authService.updatePassword(
      newPassword,
      confirmNewPassowrd,
      email,
    );
  }

  @Mutation(() => String, { name: 'testFile' })
  async testFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    const { filename, createReadStream } = file;
    const uploadPath = join(process.cwd(), 'uploads', Date.now() + filename);

    return new Promise((resolve, reject) => {
      const stream = createReadStream();
      const writeStream = createWriteStream(uploadPath);
      stream
        .pipe(writeStream)
        .on('finish', () => {
          return resolve(`/uploads/${Date.now() + filename}`);
        })
        .on('error', (err) => reject(err));
    });
  }

  @Mutation(() => JwtAuth, { name: 'login' })
  async login(@Args('input') input: LoginInput) {
    return await this.authService.login(input);
  }
}
