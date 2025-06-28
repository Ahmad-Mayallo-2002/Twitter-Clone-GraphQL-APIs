import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { Payload } from "src/assets/types";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>("JWT_SECRET") as string,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const { userId } = payload.sub;
    const jwtValidate = await this.authService.validateJwtUser(userId);
    return jwtValidate;
  }
}
