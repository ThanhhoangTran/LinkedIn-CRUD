import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { jwtConstants } from './constant';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
@Injectable()
export class JwtRefreshStategy extends PassportStrategy(
  Strategy,
  'jwt_refresh',
) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies['refresh_token'];
          if (!data) {
            return null;
          }
          return data;
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret_refresh,
    });
  }
  async validate(payload: any) {
    const user = await this.userService.findId(payload.id);
    if (!user.refresh_token) {
      throw new BadRequestException(
        'Refresh Token expired! Please login again.',
      );
    }
    return user;
  }
}
