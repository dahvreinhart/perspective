import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URL } from './app.environment';

@Module({
  imports: [UserModule, MongooseModule.forRoot(DB_URL)],
  controllers: [],
  providers: [],
})
export class AppModule {}
