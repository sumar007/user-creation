 import nodemailer from "nodemailer";
 import dotenv from "dotenv";

 dotenv.config();
 
 export const sendVerificationEmail=(email, code)=> {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Account Verification",
      text: `Your verification code is: ${code}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
      } else {
      }
    });
  }


   export const sendResetPasswordEmail= (email, resetToken)=> {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `To reset your password, click on the following link: ${resetToken}`,
      html: `<p>To reset your password, this is your reset token:${resetToken}</p>`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
      } else {
      }
    });
  }
  