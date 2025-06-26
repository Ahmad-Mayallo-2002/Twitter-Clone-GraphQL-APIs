import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyResolver } from './reply.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './entities/reply.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  providers: [ReplyResolver, ReplyService],
  imports: [TypeOrmModule.forFeature([Reply, Tweet, User])],
})
export class ReplyModule {}
