import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { DB_URL_TEST } from '../../src/app.environment';
import { UserModule } from '../../src/user/user.module';
import { Connection } from 'mongoose';
import { INVALID_EMAIL_FOR_USER_CREATION_ERROR } from '../../src/common/errors';
import { User } from 'src/user/user.schema';

describe('UserController (e2e)', () => {
    const baseRoute = '/users';
    let app: INestApplication;
    let moduleFixture: TestingModule;
    let db: Connection;

    beforeEach(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [UserModule, MongooseModule.forRoot(DB_URL_TEST)],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        db = app.get(getConnectionToken());
        await db.collections.users.deleteMany({});
    });

    afterEach(async () => {
        await db.collections.users.deleteMany({});
    });

    afterAll(async () => {
        await app.close();
        await moduleFixture.close();
        await db.close();
    });

    describe('GET /users | Fetch all users', () => {
        it('should succeed and return an empty response', async () => {
            const response = await request(app.getHttpServer()).get(baseRoute);

            expect(response.status).toEqual(200);
            expect(response.body).toEqual([]);
        });

        it('should succeed and return a single user', async () => {
            const creationData = {
                uuid: '00000000-0000-0000-0000-000000000000',
                name: 'Test Name',
                email: 'test@test.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            await db.collections.users.insertOne(creationData);

            const response = await request(app.getHttpServer()).get(baseRoute);

            expect(response.status).toEqual(200);
            expect(response.body).toHaveLength(1);
            expect(response.body[0].uuid).toEqual(creationData.uuid);
            expect(response.body[0].name).toEqual(creationData.name);
            expect(response.body[0].email).toEqual(creationData.email);
            expect(new Date(response.body[0].createdAt)).toEqual(creationData.createdAt);
            expect(new Date(response.body[0].updatedAt)).toEqual(creationData.updatedAt);
        });

        it('should succeed and return a multiple users with default sorting', async () => {
            const creationData = {
                uuid: '00000000-0000-0000-0000-000000000000',
                name: 'Test Name1',
                email: 'test@test.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const user1Id = (await db.collections.users.insertOne({ ...creationData })).insertedId;
            const user1 = await db.collections.users.findOne(user1Id);

            creationData.createdAt = new Date();
            creationData.email = 'test2@test.com';
            const user2Id = (await db.collections.users.insertOne({ ...creationData })).insertedId;
            const user2 = await db.collections.users.findOne(user2Id);

            creationData.createdAt = new Date();
            creationData.email = 'test3@test.com';
            const user3Id = (await db.collections.users.insertOne({ ...creationData })).insertedId;
            const user3 = await db.collections.users.findOne(user3Id);

            const response = await request(app.getHttpServer()).get(baseRoute);

            expect(response.status).toEqual(200);
            expect(response.body).toHaveLength(3);
            expect(response.body.map((user: User) => user.email)).toEqual([user3?.email, user2?.email, user1?.email]);
        });

        it('should succeed and return a multiple users with non-default sorting', async () => {
            const creationData = {
                uuid: '00000000-0000-0000-0000-000000000000',
                name: 'Test Name1',
                email: 'test@test.com',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const user1Id = (await db.collections.users.insertOne({ ...creationData })).insertedId;
            const user1 = await db.collections.users.findOne(user1Id);

            creationData.createdAt = new Date();
            creationData.email = 'test2@test.com';
            const user2Id = (await db.collections.users.insertOne({ ...creationData })).insertedId;
            const user2 = await db.collections.users.findOne(user2Id);

            creationData.createdAt = new Date();
            creationData.email = 'test3@test.com';
            const user3Id = (await db.collections.users.insertOne({ ...creationData })).insertedId;
            const user3 = await db.collections.users.findOne(user3Id);

            const response = await request(app.getHttpServer()).get(baseRoute).query({ created: 'asc' });

            expect(response.status).toEqual(200);
            expect(response.body).toHaveLength(3);
            expect(response.body.map((user: User) => user.email)).toEqual([user1?.email, user2?.email, user3?.email]);
        });

        it('should fail and return an error when an invalid sorting value is used', async () => {
            const response = await request(app.getHttpServer()).get(baseRoute).query({ created: 'invalidValue' });

            expect(response.status).toEqual(400);
        });
    });

    describe('POST /users | Create new user', () => {
        it('should succeed and create a new user', async () => {
            const creationData = { name: 'Test Name', email: 'test@test.com' };

            const response = await request(app.getHttpServer()).post(baseRoute).send(creationData);

            expect(response.status).toEqual(201);
            expect(response.body.uuid).toEqual(expect.any(String));
            expect(response.body.name).toEqual(creationData.name);
            expect(response.body.email).toEqual(creationData.email);
            expect(new Date(response.body.createdAt)).toEqual(expect.any(Date));
            expect(new Date(response.body.updatedAt)).toEqual(expect.any(Date));
        });

        it('should fail and return an error when a duplicate email is given', async () => {
            const creationData = { name: 'Test Name', email: 'test@test.com' };

            const response = await request(app.getHttpServer()).post(baseRoute).send(creationData);

            expect(response.status).toEqual(201);

            const duplicateResponse = await request(app.getHttpServer()).post(baseRoute).send(creationData);

            expect(duplicateResponse.status).toEqual(400);
            expect(JSON.parse(duplicateResponse.text).message).toContain(INVALID_EMAIL_FOR_USER_CREATION_ERROR);
        });

        it('should fail and return an error when an invalid is given', async () => {
            expect((await request(app.getHttpServer()).post(baseRoute).send({ email: 'test@test.com' })).status).toEqual(400);
            expect((await request(app.getHttpServer()).post(baseRoute).send({ name: null, email: 'test@test.com' })).status).toEqual(400);
            expect((await request(app.getHttpServer()).post(baseRoute).send({ name: undefined, email: 'test@test.com' })).status).toEqual(400);
            expect((await request(app.getHttpServer()).post(baseRoute).send({ name: '', email: 'test@test.com' })).status).toEqual(400);
        });

        it('should fail and return an error when an invalid email is given', async () => {
            expect((await request(app.getHttpServer()).post(baseRoute).send({ name: 'Test Name' })).status).toEqual(400);
            expect((await request(app.getHttpServer()).post(baseRoute).send({ name: 'Test Name', email: null })).status).toEqual(400);
            expect((await request(app.getHttpServer()).post(baseRoute).send({ name: 'Test Name', email: undefined })).status).toEqual(400);
            expect((await request(app.getHttpServer()).post(baseRoute).send({ name: 'Test Name', email: '' })).status).toEqual(400);
            expect((await request(app.getHttpServer()).post(baseRoute).send({ name: 'Test Name', email: 'notAnEmail' })).status).toEqual(400);
        });
    });
});
