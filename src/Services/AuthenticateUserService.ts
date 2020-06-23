import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../Models/User';

interface Request {
  email: string;
  password: string
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user){
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched){
      throw new Error('Incorrect email/password combination.');
    }

    const token = sign({  }, '65257bf9d6a8bcb3c7ac5dbb041bdcf2', {
      subject: user.id,
      expiresIn: '1d'
    })

    return {
      user,
      token,
    };
  }
}
export default AuthenticateUserService;