import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StuffModule } from './stuff/stuff.module';
import { SessionMiddleware } from './common/middlewares/session.middleware';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/interfaces/env.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    StuffModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}
