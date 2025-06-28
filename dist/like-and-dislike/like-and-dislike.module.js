"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeAndDislikeModule = void 0;
const common_1 = require("@nestjs/common");
const like_and_dislike_service_1 = require("./like-and-dislike.service");
const like_and_dislike_resolver_1 = require("./like-and-dislike.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const like_entity_1 = require("./enitites/like.entity");
const dislike_entity_1 = require("./enitites/dislike.entity");
const user_entity_1 = require("../user/entities/user.entity");
const tweet_entity_1 = require("../tweet/entities/tweet.entity");
let LikeAndDislikeModule = class LikeAndDislikeModule {
};
exports.LikeAndDislikeModule = LikeAndDislikeModule;
exports.LikeAndDislikeModule = LikeAndDislikeModule = __decorate([
    (0, common_1.Module)({
        providers: [like_and_dislike_service_1.LikeAndDislikeService, like_and_dislike_resolver_1.LikeAndDislikeResolver],
        imports: [typeorm_1.TypeOrmModule.forFeature([like_entity_1.Like, dislike_entity_1.Dislike, user_entity_1.User, tweet_entity_1.Tweet])],
    })
], LikeAndDislikeModule);
//# sourceMappingURL=like-and-dislike.module.js.map