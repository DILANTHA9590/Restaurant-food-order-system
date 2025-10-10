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

  async sendOtpEmail(email: string, otp: number) {
    const subject = '🔐 Verify Your Email - Food Order System';
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Welcome to Food Order System 🍔</h2>
        <p>Dear Customer,</p>
        <p>To verify your email, please use the following One-Time Password (OTP):</p>
        <h1 style="color: #007bff; letter-spacing: 3px;">${otp}</h1>
        <p>This OTP will expire in <strong>2 minutes</strong>. Do not share it with anyone.</p>
        <hr/>
        <p>If you didn’t request this verification, please ignore this email.</p>
        <p>— The Food Order System Team 🍽️</p>
      </div>
    `;

    return await this.sendMail(email, subject, '', html);
  }


async sendMailOrderConfirmation(email: string, orderId: string) {


}



async sendMailTableConfimration(){

}

}