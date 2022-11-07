import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtConstants } from './constant';
import { JwtStategy } from './jwt.strategy';
import { JwtRefreshStategy } from './jwt_refresh.strategy';
// import { PassportModule } from '@nestjs/passport/dist';
@Module({
  imports: [
    UsersModule,
    // PassportModule,
    JwtModule,
  ],
  providers: [AuthService, JwtStategy, JwtRefreshStategy],
  controllers: [AuthController],
})
export class AuthModule {}
