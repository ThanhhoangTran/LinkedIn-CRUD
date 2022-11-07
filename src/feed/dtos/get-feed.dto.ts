import { Expose } from 'class-transformer';

export class GetFeedDto {
  @Expose()
  posts_id: number;
  @Expose()
  posts_body: string;
  @Expose()
  posts_createAt: Date;
  @Expose()
  user_id: number;
  @Expose()
  user_email: string;
  @Expose()
  category_id: string;
}
