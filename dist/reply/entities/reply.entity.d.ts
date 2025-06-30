import { IdDate } from 'src/assets/idDateClass';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { User } from 'src/user/entities/user.entity';
import { Relation } from 'typeorm';
export declare class Reply extends IdDate {
    content: string;
    media: string;
    user: Relation<User>;
    tweet: Relation<Tweet>;
}
