import crypto from 'crypto'
import HashService from './Hash_service.js';
import nodemailer from "nodemailer";
// import twilio from 'twilio'
import dotenv from 'dotenv'
dotenv.config();
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "birju2singh@gmail.com",
      pass: "fotbkoiqogwuftmc",  //go on google accounts manage and seach app password then get this password 
    },
  });
const OtpService = {
    generateOtp() {
        const otp = crypto.randomInt(100000, 999999);
        return otp;
    },
    async SendEmail(to,msg) {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Verify Your Email" <birju2singh@gmail.com>', // sender address
          to: to, // list of receivers
          subject:"Verify Email ", // Subject line
          text: "Hello world?", // plain text body
          html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          padding: 10px 0;
        }
        .header img {
          max-width: 120px;
        }
        .content {
          padding: 20px;
          font-size: 16px;
          line-height: 1.6;
          text-align: center;
        }
        .otp {
          display: inline-block;
          background-color: #007BFF;
          color: #ffffff;
          font-weight: bold;
          font-size: 24px;
          padding: 10px 20px;
          border-radius: 5px;
          margin: 20px 0;
          letter-spacing: 2px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #666;
          padding: 10px 20px;
          border-top: 1px solid #eeeeee;
          margin-top: 20px;
        }
        .footer a {
          color: #007BFF;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://yourlogo.com/logo.png" alt="Company Logo">
        </div>
        <div class="content">
          <h2>Verification Code</h2>
          <p>Hello,</p>
          <p>We received a request to verify your email address. Use the code below to complete the process:</p>
          <div class="otp">${msg}</div>
          <p>If you did not request this code, please ignore this email or contact support.</p>
          <p>Thank you!<br>Company Name</p>
        </div>
        <div class="footer">
          <p>If you have any questions, please <a href="mailto:support@yourcompany.com">contact our support team</a>.</p>
          <p>&copy; 2023 Company Name. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `, // html body
        });
      },
    verifyOtp(hash, data) {
        const newHash = HashService.hashOtp(data);
        return newHash == hash;
    }
}
export default OtpService

