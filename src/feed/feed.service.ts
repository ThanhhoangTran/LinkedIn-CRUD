import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Feed } from './feed.entity';
@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed) private readonly feedRepo: Repository<Feed>,
  ) {}

  createPost(user: User, body: string) {
    const post = this.feedRepo.create({ body });
    post.user = user;
    return this.feedRepo.save(post);
  }

  async findOne(id: number) {
    const feed = await this.feedRepo.findOneBy({ id });
    if (!feed) {
      throw new NotFoundException('feed not found');
    }
    return feed;
  }
  findAllFeed() {
    return this.feedRepo.find({
      relations: {
        user: true,
      },
    });
  }
  findCurrentUser(user: User) {
    return this.feedRepo.find({ where: { user } });
  }
}
