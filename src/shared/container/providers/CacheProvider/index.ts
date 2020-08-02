import { container } from 'tsyringe';
import cacheConfig from '@config/cache';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import RedisCacheProvider from '@shared/container/providers/CacheProvider/implementations/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

const providersConsole = {
  redis: 'Redis (Redis API)',
};

console.log(`💾 - Cache Provider: ${providersConsole[cacheConfig.driver]}`);

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  providers[cacheConfig.driver],
);
