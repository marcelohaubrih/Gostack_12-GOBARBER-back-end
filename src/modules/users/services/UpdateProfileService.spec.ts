import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: 'passwordtest',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'jhontre@exemple.com',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('jhontre@exemple.com');
  });

  it('should not be able update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'wrong-user-id',
        name: 'John Trê',
        email: 'johndoe@exemple.com',
        password: '123123',
        old_password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@exemple.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@exemple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'jhontre@exemple.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to the password with old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@exemple.com',
        password: '123456',
        // old_password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'johndoe@exemple.com',
        password: '123456',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
