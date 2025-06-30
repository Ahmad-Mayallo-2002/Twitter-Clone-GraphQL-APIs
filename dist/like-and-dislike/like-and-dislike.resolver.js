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
exports.LikeAndDislikeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const like_and_dislike_service_1 = require("./like-and-dislike.service");
let LikeAndDislikeResolver = class LikeAndDislikeResolver {
    likeAndDislikeService;
    constructor(likeAndDislikeService) {
        this.likeAndDislikeService = likeAndDislikeService;
    }
    async getTweetLikesCount(tweetId) {
        return await this.likeAndDislikeService.getLikeTweetCount(tweetId);
    }
    async getTweetDislikesCount(tweetId) {
        return await this.likeAndDislikeService.getDislikeTweetCount(tweetId);
    }
    async addLike(tweetId, userId) {
        return await this.likeAndDislikeService.addLike(userId, tweetId);
    }
    async addDislike(tweetId, userId) {
        return await this.likeAndDislikeService.addDislike(userId, tweetId);
    }
};
exports.LikeAndDislikeResolver = LikeAndDislikeResolver;
__decorate([
    (0, graphql_1.Query)(() => Number, { name: 'getTweetLikesCount' }),
    __param(0, (0, graphql_1.Args)('tweetId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LikeAndDislikeResolver.prototype, "getTweetLikesCount", null);
__decorate([
    (0, graphql_1.Query)(() => Number, { name: 'getTweetdislikesCount' }),
    __param(0, (0, graphql_1.Args)('tweetId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LikeAndDislikeResolver.prototype, "getTweetDislikesCount", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'addLike' }),
    __param(0, (0, graphql_1.Args)('tweetId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LikeAndDislikeResolver.prototype, "addLike", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'addDislike' }),
    __param(0, (0, graphql_1.Args)('tweetId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LikeAndDislikeResolver.prototype, "addDislike", null);
exports.LikeAndDislikeResolver = LikeAndDislikeResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [like_and_dislike_service_1.LikeAndDislikeService])
], LikeAndDislikeResolver);
//# sourceMappingURL=like-and-dislike.resolver.js.map