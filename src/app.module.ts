import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { TweetModule } from './tweet/tweet.module';
import { ReplyModule } from './reply/reply.module';
import { User } from './user/entities/user.entity';
import { Tweet } from './tweet/entities/tweet.entity';
import { Reply } from './reply/entities/reply.entity';
import { Dislike } from './like-and-dislike/enitites/dislike.entity';
import { Like } from './like-and-dislike/enitites/like.entity';
import { AuthModule } from './auth/auth.module';
import { LikeAndDislikeModule } from './like-and-dislike/like-and-dislike.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      port: Number(process.env.DB_PORT),
      synchronize: true,
      autoLoadEntities: true,
      entities: [User, Tweet, Reply, Like, Dislike],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gpl',
      sortSchema: true,
      playground: true,
    }),
    UserModule,
    TweetModule,
    ReplyModule,
    AuthModule,
    LikeAndDislikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}