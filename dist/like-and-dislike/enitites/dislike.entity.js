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
exports.Dislike = void 0;
const graphql_1 = require("@nestjs/graphql");
const idDateClass_1 = require("../../assets/idDateClass");
const tweet_entity_1 = require("../../tweet/entities/tweet.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Dislike = class Dislike extends idDateClass_1.IdDate {
    user;
    tweet;
};
exports.Dislike = Dislike;
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.dislikes, {
        onDelete: 'CASCADE',
        cascade: true,
    }),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", Object)
], Dislike.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tweet_entity_1.Tweet, (tweet) => tweet.dislikes, {
        onDelete: 'CASCADE',
        cascade: true,
    }),
    (0, graphql_1.Field)(() => tweet_entity_1.Tweet),
    __metadata("design:type", Object)
], Dislike.prototype, "tweet", void 0);
exports.Dislike = Dislike = __decorate([
    (0, typeorm_1.Entity)({ name: 'dislikes' }),
    (0, graphql_1.ObjectType)()
], Dislike);
//# sourceMappingURL=dislike.entity.js.map