import { TweetService } from './tweet.service';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetInput } from './dto/create-tweet.input';
import { UpdateTweetInput } from './dto/update-tweet.input';
export declare class TweetResolver {
    private readonly tweetService;
    constructor(tweetService: TweetService);
    createTweet(input: CreateTweetInput, userId: number): Promise<Tweet | Error>;
    findAll(): Promise<Tweet[]>;
    findUserTweet(id: number): Promise<Tweet[]>;
    findOne(id: number): Promise<Tweet | import("@nestjs/common").NotFoundException>;
    updateTweet(input: UpdateTweetInput, userId: number, tweetId: number): Promise<true | import("@nestjs/common").NotFoundException>;
    removeTweet(id: number, userId: number): Promise<true | import("@nestjs/common").NotFoundException>;
}
