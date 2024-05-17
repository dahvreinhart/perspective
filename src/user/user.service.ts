import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async createUser(): Promise<IUser> {
    const dto = { name: 'Test Name', email: 'Test Email' };
    const newUser = new this.userModel(dto);
    const newUserObject = await newUser.save();

    return {
        uuid: newUserObject.uuid,
        name: newUserObject.name,
        email: newUserObject.email,
        createdAt: newUserObject.createdAt,
        updatedAt: newUserObject.updatedAt,
    };
  }

  public async getUsers(): Promise<IUser[]> {
    return (await this.userModel.find()).map((user) => ({
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }));
  }
}
