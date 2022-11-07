import { Expose, Transform } from 'class-transformer';
export class FeedDto {
  @Expose()
  id: number;

  @Expose()
  body: string;

  @Expose()
  createAt: Date;

  // @Transform(({ obj }) => obj.user.id)
  // @Expose()
  // userId: number;
}
