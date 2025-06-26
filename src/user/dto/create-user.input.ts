import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/assets/role.enum';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;

  @IsString()
  @Field({ nullable: true, defaultValue: 'image.png' })
  image?: string;

  @Field({ nullable: true, defaultValue: 'Hello, World!' })
  bio?: string;

  @Field(() => Role, { defaultValue: Role.USER })
  role: Role;
}
