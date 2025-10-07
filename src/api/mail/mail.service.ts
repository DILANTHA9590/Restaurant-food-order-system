import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // or 'hotmail' / 'yahoo'
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject,
        text,
        html,
      });
      console.log('✅ Email sent:', info.messageId);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      console.error('❌ Email send failed:', error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }





}
