import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
