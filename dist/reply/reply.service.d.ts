import { CreateReplyInput } from './dto/create-reply.input';
import { UpdateReplyInput } from './dto/update-reply.input';
import { DataSource, Repository } from 'typeorm';
import { Reply } from './entities/reply.entity';
import { User } from 'src/user/entities/user.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';
export declare class ReplyService {
    private readonly dataSource;
    private readonly replyRepo;
    private readonly userRepo;
    private readonly tweetRepo;
    constructor(dataSource: DataSource, replyRepo: Repository<Reply>, userRepo: Repository<User>, tweetRepo: Repository<Tweet>);
    getUserReplies(userId: number): Promise<Reply[]>;
    getSingleReply(replyId: number): Promise<Reply>;
    getAllReplies(): Promise<Reply[]>;
    getTweetReplies(tweetId: number): Promise<Reply[]>;
    deleteReply(replyId: number, userId: number): Promise<boolean>;
    updateReply(replyId: number, userId: number, input: UpdateReplyInput): Promise<boolean>;
    createReply(tweetId: number, userId: number, input: CreateReplyInput): Promise<Reply>;
}
