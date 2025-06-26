import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTweetInput } from './dto/update-tweet.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTweetInput } from './dto/create-tweet.input';
import { User } from 'src/user/entities/user.entity';
import { log } from 'console';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet) private readonly tweetRepo: Repository<Tweet>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async create(input: CreateTweetInput, userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) return new NotFoundException('User is not Found!');
    if (!input.content && !input.media)
      return new Error('You Can not Write Empty Tweet!');
    const newTweet = this.tweetRepo.create({
      content: input.content,
      user,
    });
    return await this.tweetRepo.save(newTweet);
  }

  async findAll() {
    const tweets = await this.dataSource
      .getRepository(Tweet)
      .createQueryBuilder('tweet')
      .innerJoin('tweet.user', 'user')
      .select([
        'user.username',
        'user.name',
        'user.image',
        'user.id',
        'tweet.content',
        'tweet.media',
        'tweet.id',
      ])
      .addSelect('tweet.id', 'tweetId')
      .addSelect('user.id', 'userId')
      .getMany();
    return tweets;
  }

  async findOne(id: number) {
    const tweet = await this.dataSource
      .getRepository(Tweet)
      .createQueryBuilder('tweet')
      .innerJoin('tweet.user', 'user')
      .select([
        'user.username',
        'user.name',
        'user.id',
        'tweet.id',
        'tweet.content',
      ])
      .addSelect('user.id', 'user_id')
      .addSelect('tweet.id', 'tweet_id')
      .where('tweet.id=:id', { id })
      .getOne();
    if (!tweet) return new NotFoundException('Tweet is not Found!');
    return tweet;
  }

  async update(id: number, input: UpdateTweetInput, userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) return new NotFoundException('User is not Found!');
    const updatedTweet = await this.tweetRepo.preload({
      content: input.content,
      id,
      user,
    });
    if (!updatedTweet) return new NotFoundException('Tweet is not Found!');
    return true;
  }

  async remove(id: number, userId: number) {
    const tweet = await this.tweetRepo.findOne({
      where: {
        id,
        user: { id: userId },
      },
      relations: ['user'],
    });
    if (!tweet) return new NotFoundException('Tweet is not Found!');
    await this.tweetRepo.delete(id);
    return true;
  }

  async getUsetTweets(userId: number) {
    const tweets = await this.dataSource
      .getRepository(Tweet)
      .createQueryBuilder('tweet')
      .innerJoin('tweet.user', 'user')
      .select([
        'user.id',
        'user.username',
        'user.name',
        'user.image',
        'tweet.id',
        'tweet.content',
        'tweet.media',
        'tweet.created_at',
        'tweet.updated_at',
      ])
      .addSelect('user.id', 'user_id')
      .addSelect('tweet.id', 'tweet_id')
      .where('user.id = :id', { id: userId })
      .getMany();
    return tweets;
  }
}
