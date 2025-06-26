import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateTweetInput {
  @IsString()
  @Field({ nullable: false, defaultValue: '' })
  content: string;

  @IsString()
  @Field(() => [String], { defaultValue: [], nullable: false })
  media: string[];
}
