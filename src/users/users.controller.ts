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
import { AuthGuard } from 'src/guards/auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserInterceptor } from './interceptors/user.interceptor';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CurrentUserDecorator } from 'src/auth/decorators/current-user.decorator';
import { AdminGuard } from 'src/guards/admin.guard';
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
  @UseGuards(AuthGuard)
  updateByUser(
    @CurrentUserDecorator() currentUser,
    @Body() body: UpdateUserDto,
  ) {
    // console.log(currentUser);
    return this.usersService.updateUser(currentUser.email, body);
  }

  @Get()
  @UseGuards(AdminGuard)
  getAllUser() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  @UseGuards(AdminGuard)
  getOneUser(@Param('id') id: string) {
    return this.usersService.findId(parseInt(id));
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteOne(parseInt(id));
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  updateByAdmin(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateOne(parseInt(id), body);
  }
}
