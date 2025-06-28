import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthStrategy } from "./strategy/auth.strategy";

@Module({
  providers: [AuthResolver, AuthService, AuthStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret_key: string =
          configService.get<string>("JWT_SECRET") || "jwt";

        return {
          secret: secret_key,
          signOptions: {
            expiresIn: configService.get<string>("JWT_EXPIRES"),
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
