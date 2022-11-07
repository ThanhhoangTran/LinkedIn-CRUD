import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Session,
  Get,
  UseGuards,
  Response,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUserDecorator } from './decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { jwtConstants } from './constant';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signupUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    return user;
  }
  @Post('/login')
  async loginUser(
    @Body() { email, password }: { email: string; password: string },
    @Response({ passthrough: true }) res: any,
  ) {
    const data = await this.authService.login(email, password);
    res.cookie('access_token', data.access_token, { http: true });
    res.cookie('refresh_token', data.refresh_token, { http: true });
    return data;
  }

  @Post('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logoutUser(
    @Response({ passthrough: true }) res: any,
    @CurrentUserDecorator() currentUser: User,
  ) {
    this.authService.logout(currentUser.id);
    res.cookie('access_token', null, { http: true });
    res.cookie('refresh_token', null, { http: true });
  }
  @Post('/change-password')
  @UseGuards(AuthGuard('jwt'))
  changePass(
    @CurrentUserDecorator() user: User,
    @Body() body: { oldPass: string; newPass: string },
  ) {
    return this.authService.changePassword(user.id, body.oldPass, body.newPass);
  }

  @Get('/refresh-token')
  @UseGuards(AuthGuard('jwt_refresh'))
  getAccessToken(
    @CurrentUserDecorator() user: User,
    @Response({ passthrough: true }) res: any,
  ) {
    const access_token = this.authService.createToken(
      { id: user.id, role: user.role },
      '360s',
      jwtConstants.secret,
    );
    res.cookie('access_token', access_token, { http: true });
    return access_token;
  }
}
