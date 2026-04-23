import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  recipient: any;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  sender: any;

  @Prop({ required: true, enum: ['like', 'comment', 'follow'] })
  type: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Article' })
  article: any;

  @Prop({ default: false })
  read: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);