import { LikeAndDislikeService } from './like-and-dislike.service';
export declare class LikeAndDislikeResolver {
    private readonly likeAndDislikeService;
    constructor(likeAndDislikeService: LikeAndDislikeService);
    getTweetLikesCount(tweetId: number): Promise<number>;
    getTweetDislikesCount(tweetId: number): Promise<number>;
    addLike(tweetId: number, userId: number): Promise<true | import("./enitites/like.entity").Like>;
    addDislike(tweetId: number, userId: number): Promise<boolean>;
}
