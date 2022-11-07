import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constant';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies['access_token'];
          if (!data) {
            return null;
          }
          return data;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: any) {
    const user = await this.userService.findId(payload.id);
    return user;
  }
}
