import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  Request,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dtos/create-feed.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { CurrentUserDecorator } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { FeedInterceptor } from './interceptors/feed.interceptor';
import { GetFeedDto } from './dtos/get-feed.dto';

// @UseInterceptors(FeedInterceptor)
@Controller('feeds')
export class FeedController {
  constructor(private feedService: FeedService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUserFeed(@CurrentUserDecorator() userCurrent: User) {
    return await this.feedService.findCurrentUser(userCurrent.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createFeed(
    @Body() body: CreateFeedDto,
    @CurrentUserDecorator() currentUser: User,
  ) {
    return this.feedService.createPost(
      currentUser.id,
      body.body,
      body.categories,
    );
  }

  @Get('/all')
  // @UseInterceptors(new FeedInterceptor(GetFeedDto))
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  getAllFeed() {
    return this.feedService.findAllFeed();
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteOneFeed(
    @Param('id') id: string,
    @CurrentUserDecorator() currentUser: User,
  ) {
    return this.feedService.deleteOneFeed(parseInt(id), currentUser.id);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  getFeed(@Param('id') id: string) {
    return this.feedService.findOne(parseInt(id));
  }
}
