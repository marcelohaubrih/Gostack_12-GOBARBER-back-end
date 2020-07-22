/* eslint-disable no-console */
import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      // host: process.env.SMTP_HOST,
      // port: process.env.SMTP_PORT,
      // secure: process.env.SMTP_SECURE,
      // auth: {
      //   user: process.env.SMTP_USER,
      //   pass: process.env.SMTP_PASS,
      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const info = await this.client.sendMail({
      from: {
        name: from?.name || `${process.env.SMTP_FROM_NAME}`,
        address: from?.email || `${process.env.SMTP_FROM_ADDRESS}`,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message send: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}
