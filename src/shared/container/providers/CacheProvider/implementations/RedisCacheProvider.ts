import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    console.log(`Salvando cache...(${key})`);
    console.log(key, value);
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }
    const parsedDate = JSON.parse(data) as T;
    console.log(`Recuperando cache...(${key})`);
    return parsedDate;
  }

  public async invalidate(key: string): Promise<void> {
    console.log(`Invalidando cache...(${key})`);
  }
}
