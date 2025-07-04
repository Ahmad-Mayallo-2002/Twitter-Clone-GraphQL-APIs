"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyModule = void 0;
const common_1 = require("@nestjs/common");
const reply_service_1 = require("./reply.service");
const reply_resolver_1 = require("./reply.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const reply_entity_1 = require("./entities/reply.entity");
const tweet_entity_1 = require("../tweet/entities/tweet.entity");
const user_entity_1 = require("../user/entities/user.entity");
let ReplyModule = class ReplyModule {
};
exports.ReplyModule = ReplyModule;
exports.ReplyModule = ReplyModule = __decorate([
    (0, common_1.Module)({
        providers: [reply_resolver_1.ReplyResolver, reply_service_1.ReplyService],
        imports: [typeorm_1.TypeOrmModule.forFeature([reply_entity_1.Reply, tweet_entity_1.Tweet, user_entity_1.User])],
    })
], ReplyModule);
//# sourceMappingURL=reply.module.js.map