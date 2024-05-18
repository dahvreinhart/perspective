import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserBodyDTO, GetUsersSortQueryDTO } from './user.validator';
import { INVALID_EMAIL_FOR_USER_CREATION_ERROR } from '../common/errors';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    private readonly DEFAULT_USER_SORT_ORDER = 'desc';

    /**
     * Crate a new user object and persist it in the database.
     *
     * @param creationData
     */
    public async createUser(creationData: CreateUserBodyDTO): Promise<User> {
        const emailDuplicate = await this.userModel.countDocuments({ email: creationData.email });
        if (emailDuplicate) {
            throw new HttpException(`${INVALID_EMAIL_FOR_USER_CREATION_ERROR}: ${creationData.email}`, HttpStatus.BAD_REQUEST);
        }

        const newUserModel = new this.userModel(creationData);
        const newUserObject = await newUserModel.save();

        return this.sanitizeUserFields(newUserObject);
    }

    /**
     * Fetch all users.
     *
     * @param sortQuery
     */
    public async getUsers(sortQuery?: GetUsersSortQueryDTO): Promise<User[]> {
        const users = await this.userModel.find().sort({ createdAt: sortQuery?.created || this.DEFAULT_USER_SORT_ORDER });
        return users.map((user) => this.sanitizeUserFields(user));
    }

    /**
     * Small helper method to sanitize user DB objects and enforce policy on publically accessible fields.
     *
     * @param rawUser
     */
    private sanitizeUserFields(rawUser: User): User {
        return {
            uuid: rawUser.uuid,
            name: rawUser.name,
            email: rawUser.email,
            createdAt: rawUser.createdAt,
            updatedAt: rawUser.updatedAt,
        };
    }
}
