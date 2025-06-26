import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './enitites/like.entity';
import { Repository } from 'typeorm';
import { Dislike } from './enitites/dislike.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LikeAndDislikeService {
  constructor(
    @InjectRepository(Like) private readonly likeRepo: Repository<Like>,
    @InjectRepository(Dislike)
    private readonly dislikeRepo: Repository<Dislike>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Tweet) private readonly tweetRepo: Repository<User>,
  ) {}

  private async getUserAndTweet(userId: number, tweetId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User is not Found!');

    const tweet = await this.tweetRepo.findOneBy({ id: tweetId });
    if (!tweet) throw new NotFoundException('Tweet is not Found!');

    return { user, tweet };
  }

  async addLike(userId: number, tweetId: number) {
    const { user, tweet } = await this.getUserAndTweet(userId, tweetId);

    const like = await this.likeRepo.findOneBy({ user: { id: userId } });
    const dislike = await this.dislikeRepo.findOneBy({ user: { id: userId } });

    if (dislike) await this.dislikeRepo.delete(dislike.id);
    if (like) return await this.likeRepo.delete(like.id);

    const newLike = this.likeRepo.create({
      user: { id: user?.id },
      tweet: { id: tweet?.id },
    });

    return await this.likeRepo.save(newLike);
  }

  async addDislike(userId: number, tweetId: number) {
    const { user, tweet } = await this.getUserAndTweet(userId, tweetId);

    const like = await this.likeRepo.findOneBy({ user: { id: userId } });
    const dislike = await this.dislikeRepo.findOneBy({ user: { id: userId } });

    if (dislike) await this.dislikeRepo.delete(dislike.id);
    if (like) return await this.likeRepo.delete(like.id);

    const newDislike = this.dislikeRepo.create({
      user: { id: user?.id },
      tweet: { id: tweet?.id },
    });

    return await this.likeRepo.save(newDislike);
  }

  async getLikeTweetCount(tweetId: number) {
    const counts = await this.likeRepo.count({
      where: { tweet: { id: tweetId } },
    });
    return counts;
  }

  async getDislikeTweetCount(tweetId: number) {
    const counts = await this.dislikeRepo.count({
      where: { tweet: { id: tweetId } },
    });
    return counts;
  }
}
