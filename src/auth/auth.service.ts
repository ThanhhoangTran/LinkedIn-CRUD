import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  signup(body: CreateUserDto) {
    return this.userService.createOne(body);
  }
  async changePassword(id: number, password: string, newPassword: string) {
    const user = await this.userService.findId(id);
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      throw new BadRequestException('password not correct');
    }
    const hashPass = await bcrypt.hash(newPassword, 10);
    Object.assign(user, { password: hashPass });
    return this.userService.saveUser(user);
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  createToken(payload, expired, secretKey) {
    return this.jwtService.sign(payload, {
      expiresIn: expired,
      secret: secretKey,
    });
  }
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new BadRequestException('Password not correct');
    }
    const refresh_token = this.jwtService.sign(
      { id: user.id },
      { expiresIn: '1d', secret: jwtConstants.secret_refresh },
    );
    user.refresh_token = refresh_token;
    await this.userService.saveUser(user);
    return {
      ...user,
      access_token: this.createToken(
        { id: user.id, role: user.role },
        '360s',
        jwtConstants.secret,
      ),
    };
  }
  async logout(id: number) {
    const user = await this.userService.findId(id);
    user.refresh_token = null;
    return this.userService.saveUser(user);
  }
}
