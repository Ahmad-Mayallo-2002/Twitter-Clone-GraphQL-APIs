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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const transport_1 = require("./transport");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userRepo;
    jwtService;
    constructor(userRepo, jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }
    async signUp(input) {
        const user = await this.userRepo.findOneBy({ email: input.email });
        if (user)
            throw new Error('This Email is already exist!');
        ['username', 'email', 'password'].forEach((val) => {
            if (!input[val])
                throw new common_1.NotFoundException(`${val} is required`);
        });
        const newUser = this.userRepo.create({
            ...input,
            password: await (0, bcryptjs_1.hash)(input.password, 10),
        });
        return await this.userRepo.save(newUser);
    }
    async validateUser(input) {
        const user = await this.userRepo.findOneBy({ email: input.email });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid Email!');
        const comparePassword = await (0, bcryptjs_1.compare)(input.password, user.password);
        if (!comparePassword)
            throw new common_1.UnauthorizedException('Invalid Password!');
        return user;
    }
    async getUserAndSendCode(input) {
        const user = await this.userRepo.findOneBy({ email: input.email });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid Email!');
        const code = await (0, transport_1.sendMail)(user.email);
        return code;
    }
    async compareCode(currentCode, userCode) {
        return currentCode === userCode;
    }
    async updatePassword(newPassword, confirmNewPassowrd, email) {
        if (!newPassword || !confirmNewPassowrd)
            throw new Error('Passwords are Required');
        if (newPassword !== confirmNewPassowrd)
            throw new Error('Passwords must be equal');
        await this.userRepo.update({ email }, { password: await (0, bcryptjs_1.hash)(newPassword, 10) });
        return true;
    }
    async generateToken(userId) {
        const payload = {
            sub: {
                userId,
            },
        };
        const token = await this.jwtService.signAsync(payload);
        return token;
    }
    async login(input) {
        const user = await this.validateUser(input);
        const token = await this.generateToken(user?.id);
        return {
            token,
            role: user?.role,
            id: user?.id,
        };
    }
    async validateJwt(userId) {
        const user = await this.userRepo.findOneBy({ id: userId });
        const jwtValidate = {
            id: user?.id,
            role: user?.role,
        };
        return jwtValidate;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map