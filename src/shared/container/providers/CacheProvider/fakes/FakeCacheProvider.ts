import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}
export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async save(key: string, value: any): Promise<void> {
    // console.log(`Salvando cache...(${key})`);
    this.cache[key] = JSON.stringify(value);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = this.cache[key];
    if (!data) {
      return null;
    }
    const parsedDate = JSON.parse(data) as T;
    // console.log(`Recuperando cache...(${key})`);
    return parsedDate;
  }

  public async invalidate(key: string): Promise<void> {
    // console.log(`Invalidando cache...(${key})`);
    delete this.cache[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    // console.log(`Invalidando Prefixo cache...(${prefix})`);
    const keys = Object.keys(this.cache).filter(key =>
      key.startsWith(`${prefix}:`),
    );

    keys.forEach(key => {
      delete this.cache[key];
    });
  }
}
