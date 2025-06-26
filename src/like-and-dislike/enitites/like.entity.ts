import { ObjectType, Field } from '@nestjs/graphql';
import { IdDate } from 'src/assets/idDateClass';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, Relation } from 'typeorm';

@Entity({ name: 'likes' })
@ObjectType()
export class Like extends IdDate {
  @ManyToOne(() => User, (user) => user.likes, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @Field(() => User)
  user: Relation<User>;

  @ManyToOne(() => Tweet, (tweet) => tweet.likes, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @Field(() => Tweet)
  tweet: Relation<Tweet>;
}
