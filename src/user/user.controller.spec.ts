import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { DB_URL_TEST } from '../../src/app.environment';

describe('UserController', () => {
    let controller: UserController;
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
            imports: [
                MongooseModule.forRoot(DB_URL_TEST),
                MongooseModule.forFeature([
                    { name: 'User', schema: UserSchema },
                ]),
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
    });

    afterAll(async () => {
        await module.close();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
