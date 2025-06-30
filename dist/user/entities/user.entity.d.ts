import { IdDate } from 'src/assets/idDateClass';
import { Role } from 'src/assets/role.enum';
import { Like } from 'src/like-and-dislike/enitites/like.entity';
import { Reply } from 'src/reply/entities/reply.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { Relation } from 'typeorm';
export declare class User extends IdDate {
    username: string;
    name: string;
    email: string;
    password: string;
    image?: string;
    bio?: string;
    role: Role;
    tweets: Relation<Tweet[]>;
    replies: Relation<Reply[]>;
    likes: Relation<Like>;
    dislikes: Relation<Like>;
}
