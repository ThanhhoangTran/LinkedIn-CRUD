import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './feed.entity';
import { FeedCategory } from './feed_category.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Feed, FeedCategory])],
  providers: [FeedService],
  controllers: [FeedController],
})
export class FeedModule {}
