import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const sendEmail = async ({
  email,
  emailType,
  username,
  city,
  pujaName,
  date,
  time,
  contactNumber,
  useremail,
  location,
}: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(username.toString(), 10);
    // create a transporter object
    var transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465, // SSL port
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.userid, // ensure this is correctly set in your .env
        pass: process.env.password, // ensure this is correctly set in your .env
      },
    });

    let mailOptions = {
      from: process.env.userid,
      to: email,
      subject: "Email Verification",
      text: `Hello ${username},\n\nPlease verify your email address by clicking on the following link:\n\nhttps://www.okpuja.com/verify?token=${hashedToken}\n\nThank You!`,
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
      mailOptions.subject = "Password Reset";
      mailOptions.text = `Hello ${username},\n\nPlease reset your password by clicking on the following link:\n\nhttps://www.okpuja.com/reset?token=${hashedToken}\n\nThank You!`;
      await transporter.sendMail(mailOptions);
    } else if (emailType === "CHANGE") {
      await prisma.user.update({
        where: { email },
        data: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
      mailOptions.subject = "Change Password";
      mailOptions.text = `Hello ${username},\n\nYour password has been changed successfully.\n\nThank You!`;
      await transporter.sendMail(mailOptions);
    } else if (emailType === "BOOKING") {
      mailOptions.subject = "New Puja Booking";
      mailOptions.text = `Hello ${username},\n\nA new puja booking has been made with the following details:\n\nCity: ${city}\nPuja Name: ${pujaName}\nDate: ${date}\nTime: ${time}\nLocation: ${location}\nContact Number: ${contactNumber}\nEmail: ${useremail}\n\nThank You!`;
      await transporter.sendMail(mailOptions);

      // Send auto-reply to the user
      let userReplyOptions = {
        from: process.env.userid,
        to: useremail, // Send to the user's email
        subject: "We Received Your Puja Booking",
        text: `Hello,\n\nWe have received your request for a puja booking. Our team will review the details and get back to you shortly.\n\nThank you for choosing us!\n\nBest Regards,\nOkpuja Team`,
      };
      await transporter.sendMail(userReplyOptions);
    } else if (emailType === "ASTROLOGY_BOOKING") {
      mailOptions.subject = "Astrology Booking Confirmation";
      mailOptions.text = `Hello Admin,\n\nAn astrology booking has been confirmed with the following details:\n\nEmail: ${useremail}\nPlease login to admin panel\nThank You!`;
      await transporter.sendMail(mailOptions);

      // Send auto-reply to the user
      let userReplyOptions = {
        from: process.env.userid,
        to: useremail, // Send to the user's email
        subject: "We Received Your Astrology Booking",
        text: `Hello, user! \n\nWe have received your request for an astrology booking. Our team will review the details and get back to you shortly.\n\nThank you for choosing us!\n\nBest Regards,\nOkpuja Team`,
      };
      await transporter.sendMail(userReplyOptions);
    }
  } catch (error) {
    console.error(error);
  }
};
