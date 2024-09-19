import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { Stuff, StuffSchema } from './schemas/stuff.schema';
import { StuffController } from './stuff.controller';
import { StuffService } from './stuff.service';
import { Content, ContentSchema } from './schemas/content.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Stuff.name, schema: StuffSchema },
      { name: Content.name, schema: ContentSchema },
    ]),
  ],
  controllers: [StuffController],
  providers: [StuffService],
})
export class StuffModule {}
