import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URL } from './app.environment';
import { UserSchema } from './user/user.schema';

@Module({
  imports: [UserModule, MongooseModule.forRoot(DB_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
