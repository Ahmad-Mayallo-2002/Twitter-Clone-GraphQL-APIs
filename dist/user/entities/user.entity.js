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
exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
const idDateClass_1 = require("../../assets/idDateClass");
const role_enum_1 = require("../../assets/role.enum");
const dislike_entity_1 = require("../../like-and-dislike/enitites/dislike.entity");
const like_entity_1 = require("../../like-and-dislike/enitites/like.entity");
const reply_entity_1 = require("../../reply/entities/reply.entity");
const tweet_entity_1 = require("../../tweet/entities/tweet.entity");
const typeorm_1 = require("typeorm");
let User = class User extends idDateClass_1.IdDate {
    username;
    name;
    email;
    password;
    image;
    bio;
    role;
    tweets;
    replies;
    likes;
    dislikes;
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false, unique: true }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        default: 'image.png',
    }),
    (0, graphql_1.Field)({ defaultValue: 'image.png' }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        default: 'Hello, World!',
    }),
    (0, graphql_1.Field)({ defaultValue: 'Hello, World!' }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, default: role_enum_1.Role.USER }),
    (0, graphql_1.Field)(() => role_enum_1.Role),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tweet_entity_1.Tweet, (tweet) => tweet.user),
    (0, graphql_1.Field)(() => [tweet_entity_1.Tweet], { nullable: 'itemsAndList' }),
    __metadata("design:type", Object)
], User.prototype, "tweets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reply_entity_1.Reply, (reply) => reply.user),
    (0, graphql_1.Field)(() => [reply_entity_1.Reply]),
    __metadata("design:type", Object)
], User.prototype, "replies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.Like, (like) => like.user),
    (0, graphql_1.Field)(() => [like_entity_1.Like]),
    __metadata("design:type", Object)
], User.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => dislike_entity_1.Dislike, (like) => like.user),
    (0, graphql_1.Field)(() => [like_entity_1.Like]),
    __metadata("design:type", Object)
], User.prototype, "dislikes", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' }),
    (0, graphql_1.ObjectType)()
], User);
//# sourceMappingURL=user.entity.js.map