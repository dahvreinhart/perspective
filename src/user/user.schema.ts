import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    default: () => randomUUID(),
  })
  uuid: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
