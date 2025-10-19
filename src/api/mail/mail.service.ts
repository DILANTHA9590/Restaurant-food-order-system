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



async sendMailTableConfimration(email:string,date:string,startTime:string,endTime:string ,name:string ,tableNumber:string){

const subject = '🍽️ Table Booking Confirmation - Food Order System';

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; background: #f9f9f9; padding: 20px; border-radius: 10px;">
      <h2 style="color: #28a745; text-align: center;">Your Table Has Been Booked ✅</h2>
      <p>Dear <strong>${name}</strong>,</p>
      <p>Thank you for booking with <strong>Food Order System</strong>! We’re excited to have you dine with us 🍽️</p>
      <p>Here are your reservation details:</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${date}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Start Time</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${startTime}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>End Time</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${endTime}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Table Number</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${tableNumber}</td>
        </tr>
      </table>

      <p style="margin-top: 20px;">🕒 Please arrive at least 10 minutes before your reservation time.</p>
      <p>If you need to cancel or modify your booking, please contact us as soon as possible.</p>

      <hr style="margin-top: 20px;">
      <p style="font-size: 14px; color: #555; text-align: center;">
        🍴 <strong>Food Order System</strong><br/>
        Thank you for choosing us!
      </p>
    </div>
  `;

  return await this.sendMail(email, subject, '', html);



}

}