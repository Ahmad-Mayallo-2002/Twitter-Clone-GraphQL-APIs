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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const graphql_1 = require("@nestjs/graphql");
const idDateClass_1 = require("../../assets/idDateClass");
const dislike_entity_1 = require("../../like-and-dislike/enitites/dislike.entity");
const like_entity_1 = require("../../like-and-dislike/enitites/like.entity");
const reply_entity_1 = require("../../reply/entities/reply.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Tweet = class Tweet extends idDateClass_1.IdDate {
    content;
    media;
    user;
    replies;
    likes;
    dislikes;
};
exports.Tweet = Tweet;
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false, default: '' }),
    (0, graphql_1.Field)({ defaultValue: '' }),
    __metadata("design:type", String)
], Tweet.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', array: true, default: [], nullable: false }),
    (0, graphql_1.Field)(() => [String], { defaultValue: [] }),
    __metadata("design:type", Array)
], Tweet.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.tweets, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", Object)
], Tweet.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reply_entity_1.Reply, (reply) => reply.tweet),
    (0, graphql_1.Field)(() => [reply_entity_1.Reply]),
    __metadata("design:type", Object)
], Tweet.prototype, "replies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.Like, (like) => like.user),
    (0, graphql_1.Field)(() => [like_entity_1.Like]),
    __metadata("design:type", Object)
], Tweet.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dislike_entity_1.Dislike, (like) => like.user),
    (0, graphql_1.Field)(() => [like_entity_1.Like]),
    __metadata("design:type", Object)
], Tweet.prototype, "dislikes", void 0);
exports.Tweet = Tweet = __decorate([
    (0, typeorm_1.Entity)({ name: 'tweets' }),
    (0, graphql_1.ObjectType)()
], Tweet);
//# sourceMappingURL=tweet.entity.js.map