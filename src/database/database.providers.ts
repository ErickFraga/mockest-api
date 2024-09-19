import { MongooseModule } from '@nestjs/mongoose';
import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';

export const databaseProviders = [
  MongooseModule.forRootAsync({
    imports: [EnvModule],
    inject: [EnvService],
    useFactory: async (envService: EnvService) => {
      const url = envService.get('MONGO_URL');
      const db = envService.get('MONGO_DB');

      return {
        uri: `${url}/${db}`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    },
  }),
];
