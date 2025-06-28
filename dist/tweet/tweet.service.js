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
exports.TweetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tweet_entity_1 = require("./entities/tweet.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
let TweetService = class TweetService {
    tweetRepo;
    userRepo;
    dataSource;
    constructor(tweetRepo, userRepo, dataSource) {
        this.tweetRepo = tweetRepo;
        this.userRepo = userRepo;
        this.dataSource = dataSource;
    }
    async create(input, userId) {
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user)
            return new common_1.NotFoundException('User is not Found!');
        if (!input.content && !input.media)
            return new Error('You Can not Write Empty Tweet!');
        const newTweet = this.tweetRepo.create({
            content: input.content,
            user,
        });
        return await this.tweetRepo.save(newTweet);
    }
    async findAll() {
        const tweets = await this.dataSource
            .getRepository(tweet_entity_1.Tweet)
            .createQueryBuilder('tweet')
            .innerJoin('tweet.user', 'user')
            .select([
            'user.username',
            'user.name',
            'user.image',
            'user.id',
            'tweet.content',
            'tweet.media',
            'tweet.id',
        ])
            .addSelect('tweet.id', 'tweetId')
            .addSelect('user.id', 'userId')
            .getMany();
        return tweets;
    }
    async findOne(id) {
        const tweet = await this.dataSource
            .getRepository(tweet_entity_1.Tweet)
            .createQueryBuilder('tweet')
            .innerJoin('tweet.user', 'user')
            .select([
            'user.username',
            'user.name',
            'user.id',
            'tweet.id',
            'tweet.content',
        ])
            .addSelect('user.id', 'user_id')
            .addSelect('tweet.id', 'tweet_id')
            .where('tweet.id=:id', { id })
            .getOne();
        if (!tweet)
            return new common_1.NotFoundException('Tweet is not Found!');
        return tweet;
    }
    async update(id, input, userId) {
        const user = await this.userRepo.findOneBy({ id: userId });
        if (!user)
            return new common_1.NotFoundException('User is not Found!');
        const updatedTweet = await this.tweetRepo.preload({
            content: input.content,
            id,
            user,
        });
        if (!updatedTweet)
            return new common_1.NotFoundException('Tweet is not Found!');
        return true;
    }
    async remove(id, userId) {
        const tweet = await this.tweetRepo.findOne({
            where: {
                id,
                user: { id: userId },
            },
            relations: ['user'],
        });
        if (!tweet)
            return new common_1.NotFoundException('Tweet is not Found!');
        await this.tweetRepo.delete(id);
        return true;
    }
    async getUsetTweets(userId) {
        const tweets = await this.dataSource
            .getRepository(tweet_entity_1.Tweet)
            .createQueryBuilder('tweet')
            .innerJoin('tweet.user', 'user')
            .select([
            'user.id',
            'user.username',
            'user.name',
            'user.image',
            'tweet.id',
            'tweet.content',
            'tweet.media',
            'tweet.created_at',
            'tweet.updated_at',
        ])
            .addSelect('user.id', 'user_id')
            .addSelect('tweet.id', 'tweet_id')
            .where('user.id = :id', { id: userId })
            .getMany();
        return tweets;
    }
};
exports.TweetService = TweetService;
exports.TweetService = TweetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tweet_entity_1.Tweet)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], TweetService);
//# sourceMappingURL=tweet.service.js.map