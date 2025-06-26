import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReplyInput {
  @Field({ nullable: false, defaultValue: '' })
  content: string;

  @Field(() => [String], { nullable: false, defaultValue: [] })
  media: string;
}
