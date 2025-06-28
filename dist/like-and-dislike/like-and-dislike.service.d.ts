import { Like } from './enitites/like.entity';
import { Repository } from 'typeorm';
import { Dislike } from './enitites/dislike.entity';
import { User } from 'src/user/entities/user.entity';
export declare class LikeAndDislikeService {
    private readonly likeRepo;
    private readonly dislikeRepo;
    private readonly userRepo;
    private readonly tweetRepo;
    constructor(likeRepo: Repository<Like>, dislikeRepo: Repository<Dislike>, userRepo: Repository<User>, tweetRepo: Repository<User>);
    private getTweet;
    addLike(userId: number, tweetId: number): Promise<true | Like>;
    addDislike(userId: number, tweetId: number): Promise<boolean>;
    getLikeTweetCount(tweetId: number): Promise<number>;
    getDislikeTweetCount(tweetId: number): Promise<number>;
}
