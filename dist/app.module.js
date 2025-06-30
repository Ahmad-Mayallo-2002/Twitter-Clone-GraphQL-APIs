"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const apollo_1 = require("@nestjs/apollo");
const graphql_1 = require("@nestjs/graphql");
const user_module_1 = require("./user/user.module");
const tweet_module_1 = require("./tweet/tweet.module");
const reply_module_1 = require("./reply/reply.module");
const user_entity_1 = require("./user/entities/user.entity");
const tweet_entity_1 = require("./tweet/entities/tweet.entity");
const reply_entity_1 = require("./reply/entities/reply.entity");
const dislike_entity_1 = require("./like-and-dislike/enitites/dislike.entity");
const like_entity_1 = require("./like-and-dislike/enitites/like.entity");
const auth_module_1 = require("./auth/auth.module");
const like_and_dislike_module_1 = require("./like-and-dislike/like-and-dislike.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                username: process.env.DB_USER,
                database: process.env.DB_NAME,
                password: process.env.DB_PASS,
                port: Number(process.env.DB_PORT),
                synchronize: true,
                autoLoadEntities: true,
                entities: [user_entity_1.User, tweet_entity_1.Tweet, reply_entity_1.Reply, like_entity_1.Like, dislike_entity_1.Dislike],
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: 'src/schema.gpl',
                sortSchema: true,
                playground: true,
            }),
            user_module_1.UserModule,
            tweet_module_1.TweetModule,
            reply_module_1.ReplyModule,
            auth_module_1.AuthModule,
            like_and_dislike_module_1.LikeAndDislikeModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map