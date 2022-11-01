import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';
export class FeedDto {
  @Expose()
  id: number;

  @Expose()
  body: string;

  @Expose()
  createAt: Date;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
