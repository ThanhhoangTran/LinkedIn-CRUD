import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constant';
const bcrypt = require('bcrypt');
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async createOne(body: CreateUserDto) {
    const user = await this.userRepo.find({ where: { email: body.email } });
    if (user.length) {
      throw new BadRequestException('email have exists');
    }
    const hashPass = await bcrypt.hash(body.password, 10);
    const newUser = this.userRepo.create({ ...body, password: hashPass });
    return await this.userRepo.save(newUser);
  }

  async findAll() {
    return await this.userRepo.find();
  }
  async findId(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  async deleteOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return await this.userRepo.remove(user);
  }
  async updateOne(id: number, body: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('use not found');
    }
    Object.assign(user, body);
    return await this.userRepo.save(user);
  }

  async updateUser(id: number, body: UpdateUserDto) {
    const user = await this.findId(id);
    if (!user) {
      throw new NotFoundException('use not found');
    }
    Object.assign(user, body);
    return await this.userRepo.save(user);
  }

  async findOne(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    return user;
  }

  saveUser(user: User) {
    return this.userRepo.save(user);
  }
}
