"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = require("node:process");
const nodemailer_1 = __importDefault(require("nodemailer"));
const pug_1 = __importDefault(require("pug"));
const html_to_text_1 = require("html-to-text");
class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Clement Owireku-Bogyah <${node_process_1.env.EMAIL_FROM}>`;
    }
    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            // SendGrid transporter
            return nodemailer_1.default.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD,
                },
            });
        }
        else {
            // Local transporter
            const options = {
                host: process.env.EMAIL_HOST,
                port: Number(process.env.EMAIL_PORT),
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            };
            return nodemailer_1.default.createTransport(options);
        }
    }
    // send the actual email
    async send(template, subject, attachments = []) {
        // 1. render email HTML based on a pug template
        const html = pug_1.default.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject,
        });
        // 2. define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: (0, html_to_text_1.htmlToText)(html),
            attachments,
        };
        // 3. create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }
    async sendWelcome() {
        await this.send('welcome', 'Welcome to IFILE!');
    }
    async sendResetPassword() {
        await this.send('passwordReset', 'Reset your password (Valid for only 10 mins)');
    }
    async sendFileViaEmail() {
        await this.send('emailDownload', 'Download attached');
    }
}
exports.default = Email;
//# sourceMappingURL=Email.js.map