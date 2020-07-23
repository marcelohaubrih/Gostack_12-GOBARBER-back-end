import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import storageConfig from '@config/storage';

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  geAvatar_url(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (storageConfig.driver) {
      case 'disk':
        return this.avatar
          ? `${process.env.APP_API_URL}:${process.env.APP_API_PORT}/files/${this.avatar}`
          : null;
      case 's3':
        return this.avatar ? `${storageConfig.bucketURL}/${this.avatar}` : null;
      default:
        return null;
    }
  }
}

export default User;
