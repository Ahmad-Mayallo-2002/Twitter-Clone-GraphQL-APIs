import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetResolver } from './tweet.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  providers: [TweetResolver, TweetService],
  imports: [TypeOrmModule.forFeature([Tweet, User])],
})
export class TweetModule {}
