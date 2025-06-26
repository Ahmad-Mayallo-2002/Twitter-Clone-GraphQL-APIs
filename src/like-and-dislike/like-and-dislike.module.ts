import { Module } from '@nestjs/common';
import { LikeAndDislikeService } from './like-and-dislike.service';
import { LikeAndDislikeResolver } from './like-and-dislike.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './enitites/like.entity';
import { Dislike } from './enitites/dislike.entity';
import { User } from 'src/user/entities/user.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';

@Module({
  providers: [LikeAndDislikeService, LikeAndDislikeResolver],
  imports: [TypeOrmModule.forFeature([Like, Dislike, User, Tweet])],
})
export class LikeAndDislikeModule {}
