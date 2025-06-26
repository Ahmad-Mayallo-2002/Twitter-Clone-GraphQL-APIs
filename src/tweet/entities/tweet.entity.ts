import { ObjectType, Field } from '@nestjs/graphql';
import { IdDate } from 'src/assets/idDateClass';
import { Dislike } from 'src/like-and-dislike/enitites/dislike.entity';
import { Like } from 'src/like-and-dislike/enitites/like.entity';
import { Reply } from 'src/reply/entities/reply.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

@Entity({ name: 'tweets' })
@ObjectType()
export class Tweet extends IdDate {
  @Column({ type: 'text', nullable: false, default: '' })
  @Field({ defaultValue: '' })
  content: string;

  @Column({ type: 'text', array: true, default: [], nullable: false })
  @Field(() => [String], { defaultValue: [] })
  media: string[];

  // Start Relations
  @ManyToOne(() => User, (user) => user.tweets, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field(() => User)
  user: Relation<User>;

  @OneToMany(() => Reply, (reply) => reply.tweet)
  @Field(() => [Reply])
  replies: Relation<Reply[]>;

  @OneToMany(() => Like, (like) => like.user)
  @Field(() => [Like])
  likes: Relation<Like>;

  @OneToMany(() => Dislike, (like) => like.user)
  @Field(() => [Like])
  dislikes: Relation<Like>;
  // End Relations
}
