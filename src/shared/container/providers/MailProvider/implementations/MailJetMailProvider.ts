/* eslint-disable no-console */
import nodemailer, { Transporter } from 'nodemailer';
import mailConfig from '@config/mail';
import { injectable, inject } from 'tsyringe';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class MailJetMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    const { user, pass } = mailConfig.defaults.credentials;
    const { host, port, secure } = mailConfig.defaults.server;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });
    this.client = transporter;
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;
    const info = await this.client.sendMail({
      from: {
        name: from?.name || `${name}`,
        address: from?.email || `${email}`,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message send: %s', info.messageId);
  }
}
