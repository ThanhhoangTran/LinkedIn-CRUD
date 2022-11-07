import { Feed } from 'src/feed/feed.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';

@Entity()
export class FeedCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Feed, (feed) => feed.id)
  @JoinColumn({ name: 'Feed_Id' })
  feedId: number;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'Category_Id' })
  categoryId: number;
}
