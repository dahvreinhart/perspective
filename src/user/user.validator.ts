import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { SortOrder } from "mongoose";

export class GetUsersSortQueryDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsIn(['asc', 'ascending', 'desc', 'descending'])
    created?: SortOrder;
}

export class CreateUserBodyDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;
}
