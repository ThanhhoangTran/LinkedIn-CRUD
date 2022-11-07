import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Patch,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserInterceptor } from './interceptors/user.interceptor';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CurrentUserDecorator } from 'src/auth/decorators/current-user.decorator';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
@Controller('users')
@UseInterceptors(UserInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Get('/test')
  // @UseGuards(AuthGuard)
  // logUser() {
  //   console.log('oke');
  //   return 'oke';
  // }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  updateByUser(
    @CurrentUserDecorator() currentUser,
    @Body() body: UpdateUserDto,
  ) {
    // console.log(currentUser);
    return this.usersService.updateUser(currentUser.id, body);
  }
  //

  @Get()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  getAllUser() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  getOneUser(@Param('id') id: string) {
    return this.usersService.findId(parseInt(id));
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteOne(parseInt(id));
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  updateByAdmin(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateOne(parseInt(id), body);
  }
}
