"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const reply_entity_1 = require("./entities/reply.entity");
const user_entity_1 = require("../user/entities/user.entity");
const tweet_entity_1 = require("../tweet/entities/tweet.entity");
let ReplyService = class ReplyService {
    dataSource;
    replyRepo;
    userRepo;
    tweetRepo;
    constructor(dataSource, replyRepo, userRepo, tweetRepo) {
        this.dataSource = dataSource;
        this.replyRepo = replyRepo;
        this.userRepo = userRepo;
        this.tweetRepo = tweetRepo;
    }
    async getUserReplies(userId) {
        const replies = await this.dataSource
            .getRepository(reply_entity_1.Reply)
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
    async getSingleReply(replyId) {
        const reply = await this.dataSource
            .getRepository(reply_entity_1.Reply)
            .createQueryBuilder('reply')
            .where('reply.id = :replyId', { replyId })
            .getOne();
        if (!reply)
            throw new common_1.NotFoundException('This Reply is not Found!');
        return reply;
    }
    async getAllReplies() {
        return await this.replyRepo.find({ relations: ['user', 'tweet'] });
    }
    async getTweetReplies(tweetId) {
        const tweet = await this.tweetRepo.findOneBy({ id: tweetId });
        if (!tweet)
            throw new common_1.NotFoundException('This Tweet is not Found!');
        return await this.dataSource
            .getRepository(reply_entity_1.Reply)
            .createQueryBuilder('reply')
            .innerJoin('reply.tweet', 'tweet')
            .where('tweet.id = :tweetId', { tweetId })
            .getMany();
    }
    async deleteReply(replyId, userId) {
        const reply = await this.replyRepo.findOneBy({
            id: replyId,
            user: { id: userId },
        });
        if (!reply)
            throw new common_1.NotFoundException('This reply is not Found!');
        await this.replyRepo.delete({ id: replyId });
        return true;
    }
    async updateReply(replyId, userId, input) {
        const reply = await this.replyRepo.findOneBy({
            id: replyId,
        });
        if (!reply)
            throw new common_1.NotFoundException('This Reply is not Found!');
        await this.replyRepo.update(reply, input);
        return true;
    }
    async createReply(tweetId, userId, input) {
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user)
            throw new common_1.NotFoundException('This User is not Found!');
        const tweet = await this.dataSource
            .getRepository(tweet_entity_1.Tweet)
            .createQueryBuilder('tweet')
            .where('tweet.id = :id', { id: tweetId })
            .getOne();
        if (!tweet)
            throw new common_1.NotFoundException('This Tweet is not Found!');
        const newReply = this.replyRepo.create({
            content: input.content,
            user,
            tweet,
        });
        return await this.replyRepo.save(newReply);
    }
};
exports.ReplyService = ReplyService;
exports.ReplyService = ReplyService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectRepository)(reply_entity_1.Reply)),
    __param(2, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_2.InjectRepository)(reply_entity_1.Reply)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], ReplyService);
//# sourceMappingURL=reply.service.js.map