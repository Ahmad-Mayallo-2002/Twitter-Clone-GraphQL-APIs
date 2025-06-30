import { IdDate } from 'src/assets/idDateClass';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { User } from 'src/user/entities/user.entity';
import { Relation } from 'typeorm';
export declare class Like extends IdDate {
    user: Relation<User>;
    tweet: Relation<Tweet>;
}
