import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

/**
 * DB Definition of a user.
 */
@Schema({ timestamps: true })
export class User {
    /**
     * The unique identifier of the user.
     */
    @ApiProperty()
    @Prop({
        required: true,
        default: () => randomUUID(),
    })
    uuid: string;

    /**
     * The name of the user.
     */
    @ApiProperty()
    @Prop({
        required: true,
    })
    name: string;

     /**
     * The unique email address of the user.
     */
    @ApiProperty()
    @Prop({
        required: true,
        unique: true,
    })
    email: string;

    // Timestamps specified here explicitly only for proper typing

    /**
     * The creation date of the user.
     */
    @ApiProperty()
    createdAt: Date;

    /**
     * The date when the user was last updated.
     */
    @ApiProperty()
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
