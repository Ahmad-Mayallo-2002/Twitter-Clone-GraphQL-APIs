import { ReplyService } from './reply.service';
import { Reply } from './entities/reply.entity';
import { CreateReplyInput } from './dto/create-reply.input';
import { UpdateReplyInput } from './dto/update-reply.input';
export declare class ReplyResolver {
    private readonly replyService;
    constructor(replyService: ReplyService);
    hello(): Promise<string>;
    getUserReplies(userId: number): Promise<Reply[]>;
    getSingleReply(replyId: number): Promise<Reply>;
    getAllReplies(): Promise<Reply[]>;
    getTweetRelies(tweetId: number): Promise<Reply[]>;
    deleteReply(replyId: number, userId: number): Promise<boolean>;
    updateReply(input: UpdateReplyInput, replyId: number, userId: number): Promise<boolean>;
    createReply(tweetId: number, userId: number, input: CreateReplyInput): Promise<Reply>;
}
