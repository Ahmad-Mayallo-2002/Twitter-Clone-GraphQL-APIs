import { IdDate } from 'src/assets/idDateClass';
import { Like } from 'src/like-and-dislike/enitites/like.entity';
import { Reply } from 'src/reply/entities/reply.entity';
import { User } from 'src/user/entities/user.entity';
import { Relation } from 'typeorm';
export declare class Tweet extends IdDate {
    content: string;
    media: string[];
    user: Relation<User>;
    replies: Relation<Reply[]>;
    likes: Relation<Like>;
    dislikes: Relation<Like>;
}
