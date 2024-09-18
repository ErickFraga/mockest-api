import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StuffModule } from './stuff/stuff.module';
import { SessionMiddleware } from './common/middlewares/session.middleware';

@Module({
  imports: [StuffModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
