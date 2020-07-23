import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from '@shared/container/providers/MailProvider/implementations/SESMailProvider';
import MailJetMailProvider from '@shared/container/providers/MailProvider/implementations/MailJetMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
  mailjet: container.resolve(MailJetMailProvider),
};

const providersConsole = {
  ethereal: 'Ethereal (TestAccount)',
  ses: 'AWS SES - (Produção)',
  mailjet: 'MailJet - (Produção)',
};

console.log(`✉ - Mail Provider: ${providersConsole[mailConfig.driver]}`);

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
