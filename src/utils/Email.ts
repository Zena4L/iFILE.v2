import { env } from 'node:process';
import nodemailer from 'nodemailer';
import pug from 'pug';
import { htmlToText } from 'html-to-text';

interface IUser {
  email: string;
  name: string;
}

export default class Email {
  to: string;
  firstName: string;
  url: string;
  from: string;

  constructor(user: IUser, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Clement Owireku-Bogyah <${env.EMAIL_FROM}>`;
  }

  newTransport(): nodemailer.Transporter {
    if (process.env.NODE_ENV === 'production') {
      // SendGrid transporter
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    } else {
      // Local transporter
      const options = {
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      };
      return nodemailer.createTransport(options);
    }
  }

  // send the actual email
  async send(template: string, subject: string, attachments: any[] = []) {
    // 1. render email HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../views/email/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );

    // 2. define email options
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
      attachments,
    };

    // 3. create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome():Promise<void> {
    await this.send('welcome', 'Welcome to IFILE!');
  }

  async sendResetPassword():Promise<void> {
    await this.send(
      'passwordReset',
      'Reset your password (Valid for only 10 mins)'
    );
  }

  async sendFileViaEmail():Promise<void> {
    await this.send('emailDownload', 'Download attached');
  }
}
