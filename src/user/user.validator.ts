import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'mongoose';

/**
 * The possible sort options when fetching users.
 */
export class GetUsersSortQueryDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsIn(['asc', 'ascending', 'desc', 'descending'])
    created?: SortOrder;
}

/**
 * The required data when creating a new user.
 */
export class CreateUserBodyDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;
}
