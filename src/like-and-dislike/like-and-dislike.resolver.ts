import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LikeAndDislikeService } from './like-and-dislike.service';
import { Like } from './enitites/like.entity';
import { Dislike } from './enitites/dislike.entity';

@Resolver()
export class LikeAndDislikeResolver {
  constructor(private readonly likeAndDislikeService: LikeAndDislikeService) {}

  @Query(() => Number, { name: 'getTweetLikesCount' })
  async getTweetLikesCount(
    @Args('tweetId', { type: () => Int }) tweetId: number,
  ) {
    return await this.likeAndDislikeService.getLikeTweetCount(tweetId);
  }

  @Query(() => Number, { name: 'getTweetdislikesCount' })
  async getTweetDislikesCount(
    @Args('tweetId', { type: () => Int }) tweetId: number,
  ) {
    return await this.likeAndDislikeService.getDislikeTweetCount(tweetId);
  }

  @Mutation(() => Like, { name: 'addLike' })
  async addLike(
    @Args('tweetId', { type: () => Int }) tweetId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return await this.likeAndDislikeService.addLike(userId, tweetId);
  }

  @Mutation(() => Dislike, { name: 'addLike' })
  async addDislike(
    @Args('tweetId', { type: () => Int }) tweetId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return await this.likeAndDislikeService.addDislike(userId, tweetId);
  }
}
