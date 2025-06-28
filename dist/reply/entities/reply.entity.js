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
exports.Reply = void 0;
const graphql_1 = require("@nestjs/graphql");
const idDateClass_1 = require("../../assets/idDateClass");
const tweet_entity_1 = require("../../tweet/entities/tweet.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Reply = class Reply extends idDateClass_1.IdDate {
    content;
    media;
    user;
    tweet;
};
exports.Reply = Reply;
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: '', nullable: false }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Reply.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, array: true, default: [] }),
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", String)
], Reply.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.replies, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", Object)
], Reply.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tweet_entity_1.Tweet, (tweet) => tweet.replies),
    (0, typeorm_1.JoinColumn)(),
    (0, graphql_1.Field)(() => tweet_entity_1.Tweet),
    __metadata("design:type", Object)
], Reply.prototype, "tweet", void 0);
exports.Reply = Reply = __decorate([
    (0, typeorm_1.Entity)({ name: 'replies' }),
    (0, graphql_1.ObjectType)()
], Reply);
//# sourceMappingURL=reply.entity.js.map