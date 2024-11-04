// api/signup/route.ts
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


// profile.ts
// import { PrismaClient } from '@prisma/client';
// import { getTokenInfo } from "@/helpers/getTokeninfo";
// import { NextRequest, NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export async function GET(request: NextRequest) {
//   try {
//     const userId = await getTokenInfo(request);

//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const { password, ...userWithoutPassword } = user;

//     return NextResponse.json({
//       message: "User found",
//       data: userWithoutPassword,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }


// reset_password.ts

// import { PrismaClient } from '@prisma/client';
// import bcryptjs from "bcryptjs";
// import { NextRequest, NextResponse } from "next/server";
// import { sendEmail } from "@/helpers/mailer";

// const prisma = new PrismaClient();

// export async function POST(request: NextRequest) {
//   try {
//     const reqBody = await request.json();
//     const { email, password } = reqBody;

//     // Check if user already exists
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { error: "User does not exist" },
//         { status: 400 }
//       );
//     }

//     // Hash password
//     const salt = await bcryptjs.genSalt(10);
//     const hashedPassword = await bcryptjs.hash(password, salt);

//     // Update user password
//     await prisma.user.update({
//       where: { email },
//       data: { password: hashedPassword },
//     });

//     // Send verification email
//     await sendEmail({ email, emailType: "RESET" });

//     return NextResponse.json({
//       message: "Password reset successfully",
//       success: true,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// verifyemail.ts

// import { PrismaClient } from '@prisma/client';
// import { NextRequest, NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export async function POST(request: NextRequest) {
//   try {
//     const reqBody = await request.json();
//     const { token } = reqBody;
//     console.log(token);

//     const user = await prisma.user.findFirst({
//       where: {
//         verifyToken: token,
//         verifyTokenExpiry: {
//           gt: new Date(),
//         },
//       },
//     });

//     if (!user) {
//       return NextResponse.json({ error: "Invalid token" }, { status: 400 });
//     }

//     console.log(user);

//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         isVerified: true,
//         verifyToken: null,
//         verifyTokenExpiry: null,
//       },
//     });

//     return NextResponse.json({
//       message: "Email verified successfully",
//       success: true,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }