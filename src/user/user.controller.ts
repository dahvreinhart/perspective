import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';
import { CreateUserBodyDTO, GetUsersSortQueryDTO } from './user.validator';
import { BasicValidationOptions } from '../../src/app.config';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
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
    @ApiQuery({ name: 'created', type: String, required: false, description: 'Sort by creation date' })
    @ApiOperation({ summary: 'Fetch all users', description: 'Fetch all the users in currently persisted in the database.' })
    @ApiResponse({ status: 200, description: 'Successfully fetched all users' })
    @ApiResponse({ status: 400, description: 'Query param validation error' })
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
    @ApiOperation({ summary: 'Create new user', description: 'Create a new user and persist it in the database.' })
    @ApiResponse({ status: 201, description: 'Successfully created a new user' })
    @ApiResponse({ status: 400, description: 'Creation data validation error' })
    async createUser(@Body(new ValidationPipe(BasicValidationOptions)) UserCreationData: CreateUserBodyDTO): Promise<IUser> {
        return this.userService.createUser(UserCreationData);
    }
}
