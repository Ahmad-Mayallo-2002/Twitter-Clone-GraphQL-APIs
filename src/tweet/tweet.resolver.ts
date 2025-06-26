import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TweetService } from './tweet.service';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetInput } from './dto/create-tweet.input';
import { UpdateTweetInput } from './dto/update-tweet.input';

@Resolver(() => Tweet)
export class TweetResolver {
  constructor(private readonly tweetService: TweetService) {}

  @Mutation(() => Tweet, { name: 'createTweet' })
  createTweet(
    @Args('input') input: CreateTweetInput,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return this.tweetService.create(input, userId);
  }

  @Query(() => [Tweet], { name: 'getTweets' })
  findAll() {
    return this.tweetService.findAll();
  }

  @Query(() => [Tweet], { name: 'getUserTweet' })
  findUserTweet(@Args('userId', { type: () => Int }) id: number) {
    return this.tweetService.getUsetTweets(id);
  }

  @Query(() => Tweet, { name: 'getTweet' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tweetService.findOne(id);
  }

  @Mutation(() => Tweet, { name: 'updateTweet' })
  updateTweet(
    @Args('input') input: UpdateTweetInput,
    @Args('userId', { type: () => Int }) userId: number,
    @Args('tweetId', { type: () => Int }) tweetId: number,
  ) {
    return this.tweetService.update(tweetId, input, userId);
  }

  @Mutation(() => Boolean, { name: 'deleteTweet' })
  removeTweet(
    @Args('id', { type: () => Int }) id: number,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return this.tweetService.remove(id, userId);
  }
}
