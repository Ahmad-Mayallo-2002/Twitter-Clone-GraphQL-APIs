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
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const user_entity_1 = require("../user/entities/user.entity");
const create_user_input_1 = require("../user/dto/create-user.input");
const send_mail_input_1 = require("./dto/send-mail.input");
const create_auth_input_1 = require("./dto/create-auth.input");
const auth_input_1 = require("./entities/auth.input");
let AuthResolver = class AuthResolver {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async hello(email) {
        return email;
    }
    async signUp(input) {
        return this.authService.signUp(input);
    }
    async getUserAndSendCode(input) {
        return await this.authService.getUserAndSendCode(input);
    }
    async compareCode(currentCode, userCode) {
        return await this.authService.compareCode(currentCode, userCode);
    }
    async updatePassword(newPassword, confirmNewPassowrd, email) {
        return await this.authService.updatePassword(newPassword, confirmNewPassowrd, email);
    }
    async login(input) {
        return await this.authService.login(input);
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "hello", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signUp", null);
__decorate([
    (0, graphql_1.Mutation)(() => String, { name: 'getUserAndSendCode' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_mail_input_1.UserSendMail]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "getUserAndSendCode", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'compareCode' }),
    __param(0, (0, graphql_1.Args)('currentCode')),
    __param(1, (0, graphql_1.Args)('userCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "compareCode", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'updatePassword' }),
    __param(0, (0, graphql_1.Args)("newPassword")),
    __param(1, (0, graphql_1.Args)("confirmPassword")),
    __param(2, (0, graphql_1.Args)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "updatePassword", null);
__decorate([
    (0, graphql_1.Mutation)(() => auth_input_1.JwtAuth, { name: "login" }),
    __param(0, (0, graphql_1.Args)("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map