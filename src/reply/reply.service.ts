import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReplyInput } from './dto/create-reply.input';
import { UpdateReplyInput } from './dto/update-reply.input';
import { DataSource, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reply } from './entities/reply.entity';
import { User } from 'src/user/entities/user.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { log } from 'console';

@Injectable()
export class ReplyService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Reply) private readonly replyRepo: Repository<Reply>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Reply) private readonly tweetRepo: Repository<Tweet>,
  ) {}

  async getUserReplies(userId: number) {
    const replies = await this.dataSource
      .getRepository(Reply)
      .createQueryBuilder('reply')
      .innerJoin('reply.user', 'user')
      .select([
        'user.id',
        'user.username',
        'user.name',
        'user.image',
        'reply.id',
        'reply.content',
        'reply.media',
      ])
      .addSelect('user.id', 'user_id')
      .addSelect('reply.id', 'reply_id')
      .where('user.id = :userId', { userId })
      .getMany();
    return replies;
  }

  async getSingleReply(replyId: number) {
    const reply = await this.dataSource
      .getRepository(Reply)
      .createQueryBuilder('reply')
      .where('reply.id = :replyId', { replyId })
      .getOne();
    if (!reply) throw new NotFoundException('This Reply is not Found!');
    return reply;
  }

  async getAllReplies() {
    return await this.replyRepo.find({ relations: ['user', 'tweet'] });
  }

  async getTweetReplies(tweetId: number) {
    const tweet = await this.tweetRepo.findOneBy({ id: tweetId });
    if (!tweet) throw new NotFoundException('This Tweet is not Found!');
    return await this.dataSource
      .getRepository(Reply)
      .createQueryBuilder('reply')
      .innerJoin('reply.tweet', 'tweet')
      .where('tweet.id = :tweetId', { tweetId })
      .getMany();
  }

  async deleteReply(replyId: number, userId: number) {
    const reply = await this.replyRepo.findOneBy({
      id: replyId,
      user: { id: userId },
    });
    if (!reply) throw new NotFoundException('This reply is not Found!');
    await this.replyRepo.delete({ id: replyId });
    return true;
  }

  async updateReply(replyId: number, userId: number, input: UpdateReplyInput) {
    const reply = await this.replyRepo.findOneBy({
      id: replyId,
    });
    if (!reply) throw new NotFoundException('This Reply is not Found!');
    await this.replyRepo.update(reply, input);
    return true;
  }

  async createReply(tweetId: number, userId: number, input: CreateReplyInput) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('This User is not Found!');

    const tweet = await this.dataSource
      .getRepository(Tweet)
      .createQueryBuilder('tweet')
      .where('tweet.id = :id', { id: tweetId })
      .getOne();
    if (!tweet) throw new NotFoundException('This Tweet is not Found!');
    const newReply = this.replyRepo.create({
      content: input.content,
      user,
      tweet,
    });
    return await this.replyRepo.save(newReply);
  }
}
