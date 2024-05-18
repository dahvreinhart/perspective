import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URL } from './app.environment';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
    imports: [UserModule, MongooseModule.forRoot(DB_URL)],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
