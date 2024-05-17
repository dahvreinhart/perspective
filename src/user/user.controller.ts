import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<IUser[]> {
    return this.userService.getUsers();
  }

  @Post()
  async createUser(): Promise<IUser> {
    return this.userService.createUser();
  }
}
