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
exports.ReplyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const reply_service_1 = require("./reply.service");
const reply_entity_1 = require("./entities/reply.entity");
const create_reply_input_1 = require("./dto/create-reply.input");
const update_reply_input_1 = require("./dto/update-reply.input");
let ReplyResolver = class ReplyResolver {
    replyService;
    constructor(replyService) {
        this.replyService = replyService;
    }
    async hello() {
        return 'Hello, World!';
    }
    async getUserReplies(userId) {
        return await this.replyService.getUserReplies(userId);
    }
    async getSingleReply(replyId) {
        return await this.replyService.getSingleReply(replyId);
    }
    async getAllReplies() {
        return await this.replyService.getAllReplies();
    }
    async getTweetRelies(tweetId) {
        return await this.replyService.getTweetReplies(tweetId);
    }
    async deleteReply(replyId, userId) {
        return await this.replyService.deleteReply(replyId, userId);
    }
    async updateReply(input, replyId, userId) {
        return await this.replyService.updateReply(replyId, userId, input);
    }
    async createReply(tweetId, userId, input) {
        return await this.replyService.createReply(tweetId, userId, input);
    }
};
exports.ReplyResolver = ReplyResolver;
__decorate([
    (0, graphql_1.Query)(() => String, { name: 'hello' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReplyResolver.prototype, "hello", null);
__decorate([
    (0, graphql_1.Query)(() => [reply_entity_1.Reply], { name: 'getUserReplies' }),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReplyResolver.prototype, "getUserReplies", null);
__decorate([
    (0, graphql_1.Query)(() => reply_entity_1.Reply, { name: 'getSingleReply' }),
    __param(0, (0, graphql_1.Args)('replyId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReplyResolver.prototype, "getSingleReply", null);
__decorate([
    (0, graphql_1.Query)(() => [reply_entity_1.Reply], { name: 'getAllReplies' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReplyResolver.prototype, "getAllReplies", null);
__decorate([
    (0, graphql_1.Query)(() => [reply_entity_1.Reply], { name: 'getTweetReplies' }),
    __param(0, (0, graphql_1.Args)('tweetId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReplyResolver.prototype, "getTweetRelies", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteReply' }),
    __param(0, (0, graphql_1.Args)('replyId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ReplyResolver.prototype, "deleteReply", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'updateReply' }),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Args)('replyId', { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_reply_input_1.UpdateReplyInput, Number, Number]),
    __metadata("design:returntype", Promise)
], ReplyResolver.prototype, "updateReply", null);
__decorate([
    (0, graphql_1.Mutation)(() => reply_entity_1.Reply, { name: 'createReply' }),
    __param(0, (0, graphql_1.Args)('tweetId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, create_reply_input_1.CreateReplyInput]),
    __metadata("design:returntype", Promise)
], ReplyResolver.prototype, "createReply", null);
exports.ReplyResolver = ReplyResolver = __decorate([
    (0, graphql_1.Resolver)(() => reply_entity_1.Reply),
    __metadata("design:paramtypes", [reply_service_1.ReplyService])
], ReplyResolver);
//# sourceMappingURL=reply.resolver.js.map