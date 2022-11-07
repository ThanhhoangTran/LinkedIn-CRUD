import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs';
import { FeedDto } from '../dtos/feed.dto';

export class FeedInterceptor implements NestInterceptor {
  constructor(private dto) {}
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      map((data) =>
        plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        }),
      ),
    );
  }
}
