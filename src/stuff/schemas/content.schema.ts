import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Content {
  @Prop({ required: true })
  raw: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;
}

export const ContentSchema = SchemaFactory.createForClass(Content);

// ContentSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 5 }); // one day
