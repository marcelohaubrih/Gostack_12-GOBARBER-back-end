import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
// import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;
// let fakeCacheProvider: FakeCacheProvider;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@exemple.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'wrong-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
