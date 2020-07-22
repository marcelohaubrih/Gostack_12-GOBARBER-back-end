import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IMAilConfig {
  driver: 'ethereal' | 'ses' | 'mailjet';
  region: string;
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  region: process.env.AWS_DEFAULT_REGION,
  defaults: {
    from: {
      email: process.env.SMTP_FROM_ADDRESS,
      name: process.env.SMTP_FROM_NAME,
    },
  },
} as IMAilConfig;
