import { container } from 'tsyringe';

import IHashProvider from './HashProvider/Models/IHashProvider';
import BcryptHashProvider from './HashProvider/implementations/BCryptHAshProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
