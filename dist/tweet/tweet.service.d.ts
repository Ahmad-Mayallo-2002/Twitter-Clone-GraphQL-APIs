import { NotFoundException } from '@nestjs/common';
import { UpdateTweetInput } from './dto/update-tweet.input';
import { Tweet } from './entities/tweet.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTweetInput } from './dto/create-tweet.input';
import { User } from 'src/user/entities/user.entity';
export declare class TweetService {
    private readonly tweetRepo;
    private readonly userRepo;
    private readonly dataSource;
    constructor(tweetRepo: Repository<Tweet>, userRepo: Repository<User>, dataSource: DataSource);
    create(input: CreateTweetInput, userId: number): Promise<Tweet | Error>;
    findAll(): Promise<Tweet[]>;
    findOne(id: number): Promise<Tweet | NotFoundException>;
    update(id: number, input: UpdateTweetInput, userId: number): Promise<true | NotFoundException>;
    remove(id: number, userId: number): Promise<true | NotFoundException>;
    getUsetTweets(userId: number): Promise<Tweet[]>;
}
