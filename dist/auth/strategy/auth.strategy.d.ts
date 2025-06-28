import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { Payload } from "src/assets/types";
declare const AuthStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class AuthStrategy extends AuthStrategy_base {
    private readonly configService;
    private readonly authService;
    constructor(configService: ConfigService, authService: AuthService);
    validate(payload: Payload): Promise<{
        id: number | undefined;
        role: import("../../assets/role.enum").Role | undefined;
    }>;
}
export {};
