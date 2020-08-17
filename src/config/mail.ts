interface IMAilConfig {
  driver: 'ethereal' | 'ses' | 'mailjet';
  region: string;
  defaults: {
    from: {
      email: string;
      name: string;
    };
    credentials: {
      user: string;
      pass: string;
    };
    server: {
      host: string;
      port: number;
      secure: string;
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
    credentials: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    server: {
      host: `${process.env.SMTP_HOST}`,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE,
    },
  },
} as IMAilConfig;
