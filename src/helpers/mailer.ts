import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/prisma";

const getEmailTemplate = (type: string, data: any) => {
  const logoUrl =
    "https://www.okpuja.com/_next/image?url=%2Fimage%2Fokpuja%20logo.png&w=256&q=75";
  const baseTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Template</title>
      <style>
        .container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
        .header { text-align: center; margin-bottom: 20px; }
        .header img { max-width: 150px; }
        .content { background-color: #f9f9f9; padding: 20px; border-radius: 8px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${logoUrl}" alt="Okpuja Logo">
        </div>
        <div class="content">
          ${getContent(type, data)}
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Okpuja. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  return baseTemplate;
};

const getContent = (type: string, data: any) => {
  const payments = data.bookingDetails?.payments || [];
  const payment = payments[0] || {};

  switch (type) {
    case "VERIFY":
      return `
        <h2>Hello ${data.username},</h2>
        <p>Please verify your email address by clicking on the following link:</p>
        <p><a href="https://www.okpuja.com/verify-email?token=${data.hashedToken}">Verify Email</a></p>
        <p>Thank You! 🙏</p>
      `;
    case "RESET":
      return `
        <h2>Hello ${data.username},</h2>
        <p>Please reset your password by clicking on the following link:</p>
        <p><a href="https://www.okpuja.com/reset?token=${data.hashedToken}">Reset Password</a></p>
        <p>Thank You! 🔒</p>
      `;
    case "CHANGE":
      return `
        <h2>Hello ${data.username},</h2>
        <p>Your password has been changed successfully.</p>
        <p>Thank You! 🔑</p>
      `;
    case "BOOKING":
      return `
        <h2>Hello Admin,</h2>
        <p>A new puja booking has been made with the following details:</p>
        <ul>
          <li><strong>City:</strong> ${data.city}</li>
          <li><strong>Puja Name:</strong> ${data.pujaName}</li>
          <li><strong>Date:</strong> ${data.date}</li>
          <li><strong>Time:</strong> ${data.time}</li>
          <li><strong>Location:</strong> ${data.location}</li>
          <li><strong>Contact Number:</strong> ${data.contactNumber}</li>
          <li><strong>Email:</strong> ${data.useremail}</li>
        </ul>
        <p>Thank You! 📅</p>
      `;
    case "ASTROLOGY_BOOKING":
      return `
        <h2>Hello Admin,</h2>
        <p>An astrology booking has been confirmed with the following details:</p>
        <ul>
          <li><strong>Email:</strong> ${data.useremail}</li>
        </ul>
        <p>Please login to the admin panel for more details.</p>
        <p>Thank You! 🌟</p>
      `;
    case "SERVICE_REQUESTED":
      // User email content
      return `
        <h2>Hello ${data.username},</h2>
        <p>Your booking request has been received successfully. Below are the details:</p>
        
        <h3>Transaction Details</h3>
        <ul>
          <li><strong>Booking ID:</strong> OK${data.bookingDetails?.id}-${
        data.bookingDetails?.BookId
      }</li>
          <li><strong>Transaction ID:</strong> ${
            payment.transactionId || "N/A"
          }</li>
          <li><strong>Amount Paid:</strong> ₹ ${
            payment.amount ? payment.amount / 100 : "N/A"
          }</li>
          <li><strong>Payment Method:</strong> ${
            payment.method || "NET BANKING"
          }</li>
          <li><strong>Payment Date:</strong> ${
            payment.createdAt
              ? new Date(payment.createdAt).toLocaleString()
              : "N/A"
          }</li>
          <li><strong>Payment Status:</strong> ${payment.status || "N/A"}</li>
        </ul>

        <h3>Booking Details</h3>
        <ul>
          <li><strong>Name:</strong> ${data.serviceType}</li>
          <li><strong>Date & Time:</strong> ${new Date(
            data.bookingDetails?.cart?.selected_date
          ).toLocaleDateString()} | ${
        data.bookingDetails?.cart?.selected_time
      }</li>
          <li><strong>Location:</strong> ${
            data.bookingDetails?.cart?.package?.location
          }</li>
          <li><strong>Language:</strong> ${
            data.bookingDetails?.cart?.package?.language
          }</li>
          <li><strong>Package Details:</strong> ${
            data.bookingDetails?.cart?.package?.description
          }</li>
          <li><strong>No. of Pandit:</strong> ${data.noOfPandits}</li>
          <li><strong>Puja Duration:</strong> ${data.pujaDuration}</li>
        </ul>

        <h3>User Information</h3>
        <ul>
          <li><strong>User Name:</strong> ${
            data.bookingDetails?.user?.username
          }</li>
          <li><strong>Email:</strong> ${data.bookingDetails?.user?.email}</li>
          <li><strong>Mobile:</strong> ${
            data.bookingDetails?.user?.contact
          }</li>
        </ul>

        <h3>Address Information</h3>
        <ul>
          <li><strong>Address:</strong> ${
            data.bookingDetails?.addresses?.addressline
          }, ${data.bookingDetails?.addresses?.city}, ${
        data.bookingDetails?.addresses?.state
      }, ${data.bookingDetails?.addresses?.country}</li>
          <li><strong>Landmark:</strong> ${
            data.bookingDetails?.addresses?.addressline2 || "N/A"
          }</li>
          <li><strong>Pincode:</strong> ${
            data.bookingDetails?.addresses?.postalCode
          }</li>
        </ul>

        <p>Our team will contact you shortly to confirm all details and provide additional instructions.</p>
        <p><span className="font-bold">Note: </span>Your selected time and date may vary according to our availability!</p>
        <p>Thank you for choosing our services. We're honored to serve you on this special occasion.</p>
        <p>Best regards,<br/>The Okpuja Team</p>
      `;
    case "SERVICE_REQUESTED_ADMIN":
      // Admin email content
      return `
        <h2>Hello Admin,</h2>
        <p>A new service request has been received with the following details:</p>
        
        <h3>Transaction Details</h3>
        <ul>
          <li><strong>Booking ID:</strong> OK${data.bookingDetails?.id}-${
        data.bookingDetails?.BookId
      }</li>
          <li><strong>Transaction ID:</strong> ${
            payment.transactionId || "N/A"
          }</li>
          <li><strong>Amount Paid:</strong> ₹ ${
            payment.amount ? payment.amount / 100 : "N/A"
          }</li>
          <li><strong>Payment Method:</strong> ${
            payment.method || "NET BANKING"
          }</li>
          <li><strong>Payment Date:</strong> ${
            payment.createdAt
              ? new Date(payment.createdAt).toLocaleString()
              : "N/A"
          }</li>
          <li><strong>Payment Status:</strong> ${payment.status || "N/A"}</li>
        </ul>

        <h3>Booking Details</h3>
        <ul>
          <li><strong>Service Type:</strong> ${data.serviceType}</li>
          <li><strong>Date & Time:</strong> ${new Date(
            data.bookingDetails?.cart?.selected_date
          ).toLocaleDateString()} | ${
        data.bookingDetails?.cart?.selected_time
      }</li>
          <li><strong>Location:</strong> ${
            data.bookingDetails?.cart?.package?.location
          }</li>
          <li><strong>Language:</strong> ${
            data.bookingDetails?.cart?.package?.language
          }</li>
          <li><strong>Package Details:</strong> ${
            data.bookingDetails?.cart?.package?.description
          }</li>
          <li><strong>No. of Pandit:</strong> ${data.noOfPandits}</li>
          <li><strong>Puja Duration:</strong> ${data.pujaDuration}</li>
        </ul>

        <h3>User Information</h3>
        <ul>
          <li><strong>User Name:</strong> ${
            data.bookingDetails?.user?.username
          }</li>
          <li><strong>Email:</strong> ${data.bookingDetails?.user?.email}</li>
          <li><strong>Mobile:</strong> ${
            data.bookingDetails?.user?.contact
          }</li>
        </ul>

        <h3>Address Information</h3>
        <ul>
          <li><strong>Address:</strong> ${
            data.bookingDetails?.addresses?.addressline
          }, ${data.bookingDetails?.addresses?.city}, ${
        data.bookingDetails?.addresses?.state
      }, ${data.bookingDetails?.addresses?.country}</li>
          <li><strong>Landmark:</strong> ${
            data.bookingDetails?.addresses?.addressline2 || "N/A"
          }</li>
          <li><strong>Pincode:</strong> ${
            data.bookingDetails?.addresses?.postalCode
          }</li>
        </ul>

        <p>Please review the booking and take necessary actions.</p>
        <p>Best regards,<br/>The Okpuja Team</p>
      `;
    default:
      return "";
  }
};

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
  serviceType,
  bookingDetails,
  noOfPandits,
  pujaDuration,
}: any) => {
  try {
    const hashedToken = await bcryptjs.hash(username.toString(), 10);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.userid,
        pass: process.env.password,
      },
    });

    const mailOptions = {
      from: process.env.userid,
      to: email,
      subject: getSubject(emailType),
      html: getEmailTemplate(emailType, {
        username,
        hashedToken,
        city,
        pujaName,
        date,
        time,
        contactNumber,
        useremail,
        location,
        serviceType,
        bookingDetails,
        noOfPandits,
        pujaDuration,
      }),
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
      await transporter.sendMail(mailOptions);
    } else if (emailType === "CHANGE") {
      await prisma.user.update({
        where: { email },
        data: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
      await transporter.sendMail(mailOptions);
    } else if (emailType === "BOOKING") {
      await transporter.sendMail(mailOptions);

      const userReplyOptions = {
        from: process.env.userid,
        to: useremail,
        subject: "We Received Your Puja Booking",
        html: getEmailTemplate("USER_BOOKING_CONFIRMATION", { username }),
      };
      await transporter.sendMail(userReplyOptions);
    } else if (emailType === "ASTROLOGY_BOOKING") {
      await transporter.sendMail(mailOptions);

      const userReplyOptions = {
        from: process.env.userid,
        to: useremail,
        subject: "We Received Your Astrology Booking",
        html: getEmailTemplate("USER_ASTROLOGY_CONFIRMATION", { username }),
      };
      await transporter.sendMail(userReplyOptions);
    } else if (emailType === "SERVICE_REQUESTED") {
      // Notify Admin
      const adminMailOptions = {
        from: process.env.userid,
        to: process.env.ownemail,
        subject: "New Service Request Received",
        html: getEmailTemplate("SERVICE_REQUESTED_ADMIN", {
          username,
          serviceType,
          date,
          time,
          location,
          contactNumber,
          useremail,
          bookingDetails,
          noOfPandits,
          pujaDuration,
        }),
      };
      await transporter.sendMail(adminMailOptions);
      // console.log("Sending email to admin"); // Add this line before sending email


      // Notify User
      const userMailOptions = {
        from: process.env.userid,
        to: useremail,
        subject: "Your Service Request Has Been Received",
        html: getEmailTemplate("SERVICE_REQUESTED", {
          username,
          serviceType,
          date,
          time,
          location,
          contactNumber,
          useremail,
          bookingDetails,
          noOfPandits,
          pujaDuration,
        }),
      };
      await transporter.sendMail(userMailOptions);
      // console.log("Sending email to user"); // Add this line before sending email

    }
  } catch (error) {
    console.error(error);
  }
};

const getSubject = (emailType: string) => {
  switch (emailType) {
    case "VERIFY":
      return "Email Verification";
    case "RESET":
      return "Password Reset";
    case "CHANGE":
      return "Password Changed Successfully";
    case "BOOKING":
      return "New Puja Booking";
    case "ASTROLOGY_BOOKING":
      return "Astrology Booking Confirmation";
    case "SERVICE_REQUESTED":
      return "New Service Request Received";
    default:
      return "";
  }
};
