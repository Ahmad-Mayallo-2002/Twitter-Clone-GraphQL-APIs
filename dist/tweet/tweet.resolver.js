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
exports.TweetResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const tweet_service_1 = require("./tweet.service");
const tweet_entity_1 = require("./entities/tweet.entity");
const create_tweet_input_1 = require("./dto/create-tweet.input");
const update_tweet_input_1 = require("./dto/update-tweet.input");
let TweetResolver = class TweetResolver {
    tweetService;
    constructor(tweetService) {
        this.tweetService = tweetService;
    }
    createTweet(input, userId) {
        return this.tweetService.create(input, userId);
    }
    findAll() {
        return this.tweetService.findAll();
    }
    findUserTweet(id) {
        return this.tweetService.getUsetTweets(id);
    }
    findOne(id) {
        return this.tweetService.findOne(id);
    }
    updateTweet(input, userId, tweetId) {
        return this.tweetService.update(tweetId, input, userId);
    }
    removeTweet(id, userId) {
        return this.tweetService.remove(id, userId);
    }
};
exports.TweetResolver = TweetResolver;
__decorate([
    (0, graphql_1.Mutation)(() => tweet_entity_1.Tweet, { name: 'createTweet' }),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tweet_input_1.CreateTweetInput, Number]),
    __metadata("design:returntype", void 0)
], TweetResolver.prototype, "createTweet", null);
__decorate([
    (0, graphql_1.Query)(() => [tweet_entity_1.Tweet], { name: 'getTweets' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TweetResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => [tweet_entity_1.Tweet], { name: 'getUserTweet' }),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TweetResolver.prototype, "findUserTweet", null);
__decorate([
    (0, graphql_1.Query)(() => tweet_entity_1.Tweet, { name: 'getTweet' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TweetResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'updateTweet' }),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('tweetId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_tweet_input_1.UpdateTweetInput, Number, Number]),
    __metadata("design:returntype", void 0)
], TweetResolver.prototype, "updateTweet", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteTweet' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TweetResolver.prototype, "removeTweet", null);
exports.TweetResolver = TweetResolver = __decorate([
    (0, graphql_1.Resolver)(() => tweet_entity_1.Tweet),
    __metadata("design:paramtypes", [tweet_service_1.TweetService])
], TweetResolver);
//# sourceMappingURL=tweet.resolver.js.map