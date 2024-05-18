import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_URL_TEST } from '../../src/app.environment';
import { UserSchema } from './user.schema';

describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [UserService],
      imports: [MongooseModule.forRoot(DB_URL_TEST), MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
