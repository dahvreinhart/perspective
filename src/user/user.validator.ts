import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'mongoose';

export class GetUsersSortQueryDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsIn(['asc', 'ascending', 'desc', 'descending'])
    created?: SortOrder;
}

export class CreateUserBodyDTO {
    @IsString()
    @ApiProperty()
    name: string;

    @IsEmail()
    @ApiProperty()
    email: string;
}
