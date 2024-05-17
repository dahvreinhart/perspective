import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async createUser(): Promise<User> {
    const dto = { name: 'Test Name', email: 'Test Email' };
    const newUser = new this.userModel(dto);
    return newUser.save();
  }

  public async getUsers(): Promise<User[]> {
    return this.userModel.find();
  }
}
