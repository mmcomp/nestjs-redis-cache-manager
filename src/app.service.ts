import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getHello(): Promise<string> {
    let value: string = await this.cacheManager.get<string>('hello');
    if (!value) {
      value = `${new Date().toISOString()}`;
      await this.cacheManager.set('hello', value);
    }
    return value;
  }
}
