import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedModule } from './feed/feed.module';
import { APP_PIPE, MiddlewareBuilder } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { JwtStategy } from './auth/jwt.strategy';
import { JwtRefreshStategy } from './auth/jwt_refresh.strategy';
import { CategoriesModule } from './categories/categories.module';
const cookieSession = require('cookie-session');
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DATABASE,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    FeedModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    JwtStategy,
    JwtRefreshStategy,
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
}
