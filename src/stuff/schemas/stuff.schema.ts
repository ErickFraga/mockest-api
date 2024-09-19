import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Content } from './content.schema';

@Schema()
export class Stuff {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  slug: string;

  @Prop({ type: Types.ObjectId, ref: Content.name })
  content: Content;

  @Prop({ required: true })
  ownerTag: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const StuffSchema = SchemaFactory.createForClass(Stuff);
