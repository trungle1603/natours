const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');
const { convert } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Admin <${process.env.EMAIL_FROM}>`;
  }

  // 1) Create a transporter
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // SendGrid, Gmail
      return nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // 2) Send the actual email
  async send(template, subject) {
    // a. Render HTML based on a pug template
    const html = pug.renderFile(
      path.join(__dirname, `../views/email/${template}.pug`),
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );

    // b) Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html, {
        wordwrap: 130,
      }),
    };

    // c) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset. (valid only 10 min)'
    );
  }
};
