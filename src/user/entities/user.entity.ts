import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IdDate } from 'src/assets/idDateClass';
import { Role } from 'src/assets/role.enum';
import { Dislike } from 'src/like-and-dislike/enitites/dislike.entity';
import { Like } from 'src/like-and-dislike/enitites/like.entity';
import { Reply } from 'src/reply/entities/reply.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User extends IdDate {
  @Column({ type: 'varchar', length: 255, nullable: false })
  @Field()
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Field()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  @Field()
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: 'image.png',
  })
  @Field({ defaultValue: 'image.png' })
  image?: string;

  @Column({
    type: 'text',
    nullable: true,
    default: 'Hello, World!',
  })
  @Field({ defaultValue: 'Hello, World!' })
  bio?: string;

  @Column({ type: 'varchar', length: 50, default: Role.USER })
  @Field(() => Role)
  role: Role;
  // Start Relations
  @OneToMany(() => Tweet, (tweet) => tweet.user)
  @Field(() => [Tweet], { nullable: 'itemsAndList' })
  tweets: Relation<Tweet[]>;

  @OneToMany(() => Reply, (reply) => reply.user)
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
