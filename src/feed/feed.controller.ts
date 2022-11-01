import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dtos/create-feed.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUserDecorator } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { FeedInterceptor } from './interceptors/feed.interceptor';
@Controller('feeds')
export class FeedController {
  constructor(private feedService: FeedService) {}
  @Get()
  @UseGuards(AuthGuard)
  async getCurrentUserFeed(@CurrentUserDecorator() userCurrent: User) {
    return await this.feedService.findCurrentUser(userCurrent);
  }

  @Post()
  @UseGuards(AuthGuard)
  createFeed(
    @Body() { body }: CreateFeedDto,
    @CurrentUserDecorator() currentUser,
  ) {
    return this.feedService.createPost(currentUser, body);
  }

  @Get('/all')
  @UseGuards(AuthGuard)
  getAllFeed() {
    return this.feedService.findAllFeed();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  getFeed(@Param('id') id: string) {
    return this.feedService.findOne(parseInt(id));
  }
}
