import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { prisma } from '@/lib/prisma';

export const sendEmail = async ({ email, emailType, username }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(username.toString(), 10);
    // create a transporter object
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.userid,
        pass: process.env.password,
      },
    });

    let mailOptions = {
      from: "prince@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Hello ${username},\n\nPlease verify your email address by clicking on the following link:\n\nhttp://your-website.com/verify?token=${hashedToken}\n\nThank You!`,
    };

    if (emailType === "VERIFY") {
      await prisma.user.update({
        where: { email },
        data: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
      await transporter.sendMail(mailOptions);
    } else if (emailType === "RESET") {
      await prisma.user.update({
        where: { email },
        data: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
      // Update the mailOptions for password reset
      mailOptions.subject = "Password Reset";
      mailOptions.text = `Hello ${username},\n\nPlease reset your password by clicking on the following link:\n\nhttp://your-website.com/reset?token=${hashedToken}\n\nThank You!`;
      await transporter.sendMail(mailOptions);
    }
  } catch (error) {
    console.error(error);
  }
};