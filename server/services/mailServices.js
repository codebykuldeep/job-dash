// Import the nodemailer module
import nodemailer from 'nodemailer';
import constant from '../constant.js';


const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: constant.NODE_MAIL,
      pass: constant.NODE_PASS,
    },
  });

export async function sendOTPMail(email,otp){
    const mailOptions = {
        from: constant.NODE_MAIL,
        to: email,
        subject: "Email Verification - FindJob ",
        text: "This is a email for OTP verification",
        html:`<h1>VERIFICATION CODE - ${otp}</h1>
              <p>Note : This Code is valid for 5 mins only</p>`
    };
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info);
        return true;
    } catch {
        return false;
    }
  }

