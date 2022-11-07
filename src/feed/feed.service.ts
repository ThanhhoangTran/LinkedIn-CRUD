import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feed } from './feed.entity';
import { FeedCategory } from './feed_category.entity';
@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed) private readonly feedRepo: Repository<Feed>,
    @InjectRepository(FeedCategory)
    private readonly feedCategoryRepo: Repository<FeedCategory>,
  ) {}

  async createPost(userId: number, body: string, categories: number[]) {
    const post = this.feedRepo.create({ body });
    post.userId = userId;
    await this.feedRepo.save(post);
    categories.forEach((el) => {
      let cate = this.feedCategoryRepo.create({
        feedId: post.id,
        categoryId: el,
      });
      this.feedCategoryRepo.save(cate);
    });
    return post;
  }

  async findOne(id: number) {
    const feed = await this.feedRepo
      .createQueryBuilder('feed')
      // .leftJoin('feed.userId', 'user')
      .where('id = :id', { id })
      .getRawOne();
    if (!feed) {
      throw new NotFoundException('feed not found');
    }
    return feed;
  }
  async findAllFeed() {
    return this.feedRepo
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.userId', 'user')
      .leftJoinAndSelect(
        'feed_category',
        'category',
        'category.feedId = posts.id',
      )
      .getRawMany();
  }

  findCurrentUser(userId: number) {
    return (
      this.feedRepo
        .createQueryBuilder('feed')
        // .leftJoin('feed.userId', 'user')
        .where('feed.userId = :user', { user: userId })
        .getRawMany()
    );
  }
  deleteOneFeed(id: number, userId: number) {
    // return this.feedRepo.createQueryBuilder('feed').
  }
}
