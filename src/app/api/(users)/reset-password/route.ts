import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // Generate a token
    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Update user with the token and expiry
    await prisma.user.update({
      where: { email },
      data: {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: tokenExpiry,
      },
    });

    // Send reset password email
    const resetLink = `https://www.okpuja.com//reset-password?token=${token}`;
    try {
      await sendEmail({
        email,
        emailType: "RESET",
        username: user.username, // Assuming the user object has a username field
        resetLink,
      });
    } catch (emailError) {
      return NextResponse.json(
        { error: "Failed to send reset password email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Reset password link sent successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}