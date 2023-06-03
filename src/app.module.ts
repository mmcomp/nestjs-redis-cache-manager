import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        config: ConfigService,
      ): Promise<CacheModuleOptions<RedisClientOptions>> => {
        const url = config.get<string>('REDIS_URL');
        const store = await redisStore({
          url,
        });

        return {
          store,
          url,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
