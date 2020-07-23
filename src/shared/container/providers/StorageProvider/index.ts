import { container } from 'tsyringe';
import storageConfig from '@config/storage';

import IStorageProvider from './models/IStorageProvider';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

const providersConsole = {
  disk: 'Disk (Storage API)',
  s3: 'AWS S3 - (Produção)',
};

console.log(`💾 - Storage Provider: ${providersConsole[storageConfig.driver]}`);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[storageConfig.driver],
);
