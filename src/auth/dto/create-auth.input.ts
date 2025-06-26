import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;
}
