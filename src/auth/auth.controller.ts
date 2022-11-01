import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { UserInterceptor } from 'src/users/interceptors/user.interceptor';
import { CurrentUserDecorator } from './decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
@Controller('auth')
@UseInterceptors(UserInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signupUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }
  @Post('/login')
  async loginUser(
    @Body() { email, password }: { email: string; password: string },
    @Session() session: any,
  ) {
    const user = await this.authService.login(email, password);
    session.userId = user.id;
    return user;
  }
  @Post('/logout')
  async logoutUser(@Session() session: any) {
    session.userId = null;
  }

  @Post('/change-password')
  changePass(
    @CurrentUserDecorator() currentUser: User,
    @Body() body: { oldPass: string; newPass: string },
  ) {
    return this.authService.changePassword(
      currentUser.id,
      body.oldPass,
      body.newPass,
    );
  }
}
