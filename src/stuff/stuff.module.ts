import { Module } from '@nestjs/common';
import { StuffController } from './stuff.controller';
import { StuffService } from './stuff.service';
import { DatabaseModule } from 'src/database/database.module';
import { StuffSchema } from './schemas/stuff.schema';

@Module({
  imports: [DatabaseModule],
  controllers: [StuffController],
  providers: [
    {
      provide: 'STUFFS_MODEL',
      useFactory: (connection) => connection.model('Stuff', StuffSchema),
      inject: ['DATABASE_CONNECTION'],
    },
    StuffService,
  ],
})
export class StuffModule {}
