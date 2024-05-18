import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { DB_URL_TEST } from '../../src/app.environment';
import { UserModule } from '../../src/user/user.module';
import { Connection, Mongoose } from 'mongoose';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [UserModule, MongooseModule.forRoot(DB_URL_TEST)],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const db: Connection = app.get(getConnectionToken());
    db.collections.users.deleteMany({});
  });

  afterEach(() => {
    const db: Connection = app.get(getConnectionToken());
    db.collections.users.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
    await moduleFixture.close();
  });

  describe("GET /users | Fetch all users", () =>{
    it('should succeed and return all users with a default sort', async () => {
      const response = await request(app.getHttpServer()).get('/users');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual([]);
    });
  });

  describe("POST /users | Create new user", () =>{
    it('should succeed and create a new user', async () => {
      const creationData = {name: 'Test Name', email: 'test@test.com'};

      const response = await request(app.getHttpServer()).post('/users').send(creationData)
      
      expect(response.status).toEqual(201);
      expect(response.body.uuid).toEqual(expect.any(String));
      expect(response.body.name).toEqual(creationData.name);
      expect(response.body.email).toEqual(creationData.email);
      expect(new Date(response.body.createdAt)).toEqual(expect.any(Date));
      expect(new Date(response.body.updatedAt)).toEqual(expect.any(Date));
    });
  });
});
