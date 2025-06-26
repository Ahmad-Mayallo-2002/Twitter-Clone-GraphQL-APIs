import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReplyService } from './reply.service';
import { Reply } from './entities/reply.entity';
import { CreateReplyInput } from './dto/create-reply.input';
import { UpdateReplyInput } from './dto/update-reply.input';

@Resolver(() => Reply)
export class ReplyResolver {
  constructor(private readonly replyService: ReplyService) {}

  @Query(() => String, { name: 'hello' })
  async hello() {
    return 'Hello, World!';
  }

  @Query(() => [Reply], { name: 'getUserReplies' })
  async getUserReplies(@Args('userId', { type: () => Int }) userId: number) {
    return await this.replyService.getUserReplies(userId);
  }

  @Query(() => Reply, { name: 'getSingleReply' })
  async getSingleReply(@Args('replyId', { type: () => Int }) replyId: number) {
    return await this.replyService.getSingleReply(replyId);
  }

  @Query(() => [Reply], { name: 'getAllReplies' })
  async getAllReplies() {
    return await this.replyService.getAllReplies();
  }

  @Query(() => [Reply], { name: 'getTweetReplies' })
  async getTweetRelies(@Args('tweetId', { type: () => Int }) tweetId: number) {
    return await this.replyService.getTweetReplies(tweetId);
  }

  @Mutation(() => Boolean, { name: 'deleteReply' })
  async deleteReply(
    @Args('replyId', { type: () => Int }) replyId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return await this.replyService.deleteReply(replyId, userId);
  }

  @Mutation(() => Boolean, { name: 'updateReply' })
  async updateReply(
    @Args('input') input: UpdateReplyInput,
    @Args('replyId', { type: () => Int }) replyId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return await this.replyService.updateReply(replyId, userId, input);
  }

  @Mutation(() => Reply, { name: 'createReply' })
  async createReply(
    @Args('tweetId', { type: () => Int }) tweetId: number,
    @Args('userId', { type: () => Int }) userId: number,
    @Args('input') input: CreateReplyInput,
  ) {
    return await this.replyService.createReply(tweetId, userId, input);
  }
}
