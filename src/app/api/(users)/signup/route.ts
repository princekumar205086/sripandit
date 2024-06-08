// pages/api/register.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, contact, password } = reqBody;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Insert new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        contact,
        password: hashedPassword,
      },
    });

    // Send verification email
    await sendEmail({ email, emailType: "VERIFY", username });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      username: newUser.username,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
