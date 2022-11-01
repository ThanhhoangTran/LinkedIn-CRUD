import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async login(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new NotFoundException('user not exists');
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new BadRequestException('password is discorrect');
    }
    return user;
  }
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
}
