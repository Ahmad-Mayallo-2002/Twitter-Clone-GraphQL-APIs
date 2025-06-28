import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { TweetService } from "./tweet.service";
import { Tweet } from "./entities/tweet.entity";
import { CreateTweetInput } from "./dto/create-tweet.input";
import { UpdateTweetInput } from "./dto/update-tweet.input";
import { GqlAuthGuard } from "src/auth/guards/auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver(() => Tweet)
export class TweetResolver {
  constructor(private readonly tweetService: TweetService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Tweet, { name: "createTweet" })
  createTweet(
    @Args("input") input: CreateTweetInput,
    @Args("userId", { type: () => Int }) userId: number
  ) {
    return this.tweetService.create(input, userId);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Tweet], { name: "getTweets" })
  findAll() {
    return this.tweetService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Tweet], { name: "getUserTweet" })
  findUserTweet(@Args("userId", { type: () => Int }) id: number) {
    return this.tweetService.getUsetTweets(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Tweet, { name: "getTweet" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.tweetService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: "updateTweet" })
  updateTweet(
    @Args("input") input: UpdateTweetInput,
    @Args("userId", { type: () => Int }) userId: number,
    @Args("tweetId", { type: () => Int }) tweetId: number
  ) {
    return this.tweetService.update(tweetId, input, userId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: "deleteTweet" })
  removeTweet(
    @Args("id", { type: () => Int }) id: number,
    @Args("userId", { type: () => Int }) userId: number
  ) {
    return this.tweetService.remove(id, userId);
  }
}
