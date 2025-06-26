import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IdDate } from 'src/assets/idDateClass';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToMany, ManyToOne, Relation } from 'typeorm';

@Entity({ name: 'dislikes' })
@ObjectType()
export class Dislike extends IdDate {
  @ManyToOne(() => User, (user) => user.dislikes, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @Field(() => User)
  user: Relation<User>;

  @ManyToOne(() => Tweet, (tweet) => tweet.dislikes, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @Field(() => Tweet)
  tweet: Relation<Tweet>;
}
