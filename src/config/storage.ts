interface IStorageConfig {
  driver: 's3' | 'disk';
  region: string;
  bucket: string;
  bucketURL: string;
}

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',
  region: process.env.AWS_DEFAULT_REGION,
  bucket: process.env.STORAGE_BUCKET,
  bucketURL: `https://${process.env.STORAGE_BUCKET}.s3.amazonaws.com`,
} as IStorageConfig;
