import { ObjectType, Field } from '@nestjs/graphql';
import { IdDate } from 'src/assets/idDateClass';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';

@Entity({ name: 'replies' })
@ObjectType()
export class Reply extends IdDate {
  @Column({ type: 'text', default: '', nullable: false })
  @Field()
  content: string;

  @Column({ type: 'text', nullable: true, array: true, default: [] })
  @Field(() => [String])
  media: string;

  // Start Relations
  @ManyToOne(() => User, (user) => user.replies, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field(() => User)
  user: Relation<User>;

  @ManyToOne(() => Tweet, (tweet) => tweet.replies)
  @JoinColumn()
  @Field(() => Tweet)
  tweet: Relation<Tweet>;
  // End Relations
}
