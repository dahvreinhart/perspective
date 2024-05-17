import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './user.interface';
import { CreateUserBodyDTO, GetUsersSortQueryDTO } from './user.validator';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private readonly DEFAULT_USER_SORT_ORDER = 'desc';

  public async createUser(creationData: CreateUserBodyDTO): Promise<IUser> {
    console.log(creationData);
    // Error handling

    const newUser = new this.userModel(creationData);
    const newUserObject = await newUser.save();

    return {
        uuid: newUserObject.uuid,
        name: newUserObject.name,
        email: newUserObject.email,
        createdAt: newUserObject.createdAt,
        updatedAt: newUserObject.updatedAt,
    };
  }

  public async getUsers(sortQuery?: GetUsersSortQueryDTO): Promise<IUser[]> {
    console.log(sortQuery, sortQuery?.created, this.DEFAULT_USER_SORT_ORDER);
    // Sorting and filtering
    // Error handling for sorting and filtering params
    // Mapping of fields in a mapper

    return (await this.userModel.find().sort({ createdAt: sortQuery?.created || this.DEFAULT_USER_SORT_ORDER })).map((user) => ({
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }));
  }
}
