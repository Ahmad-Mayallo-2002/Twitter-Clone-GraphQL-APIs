import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { LikeAndDislikeService } from "./like-and-dislike.service";
import { GqlAuthGuard } from "src/auth/guards/auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class LikeAndDislikeResolver {
  constructor(private readonly likeAndDislikeService: LikeAndDislikeService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Number, { name: "getTweetLikesCount" })
  async getTweetLikesCount(
    @Args("tweetId", { type: () => Int }) tweetId: number
  ) {
    return await this.likeAndDislikeService.getLikeTweetCount(tweetId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Number, { name: "getTweetdislikesCount" })
  async getTweetDislikesCount(
    @Args("tweetId", { type: () => Int }) tweetId: number
  ) {
    return await this.likeAndDislikeService.getDislikeTweetCount(tweetId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: "addLike" })
  async addLike(
    @Args("tweetId", { type: () => Int }) tweetId: number,
    @Args("userId", { type: () => Int }) userId: number
  ) {
    return await this.likeAndDislikeService.addLike(userId, tweetId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: "addDislike" })
  async addDislike(
    @Args("tweetId", { type: () => Int }) tweetId: number,
    @Args("userId", { type: () => Int }) userId: number
  ) {
    return await this.likeAndDislikeService.addDislike(userId, tweetId);
  }
}
