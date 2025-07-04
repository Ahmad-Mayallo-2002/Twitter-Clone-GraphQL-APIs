"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetModule = void 0;
const common_1 = require("@nestjs/common");
const tweet_service_1 = require("./tweet.service");
const tweet_resolver_1 = require("./tweet.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const tweet_entity_1 = require("./entities/tweet.entity");
const user_entity_1 = require("../user/entities/user.entity");
let TweetModule = class TweetModule {
};
exports.TweetModule = TweetModule;
exports.TweetModule = TweetModule = __decorate([
    (0, common_1.Module)({
        providers: [tweet_resolver_1.TweetResolver, tweet_service_1.TweetService],
        imports: [typeorm_1.TypeOrmModule.forFeature([tweet_entity_1.Tweet, user_entity_1.User])],
    })
], TweetModule);
//# sourceMappingURL=tweet.module.js.map