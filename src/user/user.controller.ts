import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser, UserCreationData } from './user.interface';
import { CreateUserBodyDTO, GetUsersSortQueryDTO } from './user.validator';
import { BasicValidationOptions } from 'src/app.config';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Fetch all users.
   * Param are pre-validated.
   *
   * @param query
   */
  @Get()
  async getUsers(@Query(new ValidationPipe(BasicValidationOptions)) query: GetUsersSortQueryDTO): Promise<IUser[]> {
    return this.userService.getUsers(query);
  }

  /**
   * Create a new user.
   * Creation params are pre-validated.
   *
   * @param UserCreationData
   * @returns 
   */
  @Post()
  async createUser(@Body(new ValidationPipe(BasicValidationOptions)) UserCreationData: CreateUserBodyDTO): Promise<IUser> {
    return this.userService.createUser(UserCreationData);
  }
}
