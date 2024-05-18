export interface IUser {
    /**
     * The unique identifier of the user.
     */
    uuid: string;

    /**
     * The name of the user.
     */
    name: string;

    /**
     * The unique email address of the user.
     */
    email: string;

    /**
     * The creation date of the user.
     */
    createdAt: Date;

    /**
     * The date when the user was last updated.
     */
    updatedAt: Date;
}

export type UserCreationData = Pick<IUser, 'name' | 'email'>;
