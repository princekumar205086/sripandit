// code for reset password route
import connectToDB from "@/dbConfig/db";
import { User } from "@/models/usersModel";
import bcryptjs from "bcryptjs";
import { OkPacket } from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2";
// sending email helper
import { sendEmail } from "@/helpers/mailer";
import mysql2 from "mysql2";

export async function POST(request: NextRequest) {
  const db = await connectToDB();
  if (!db) {
    return NextResponse.json({ message: "Failed to connect to database" });
  }

  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if user already exists
    const [users] = (await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ])) as mysql2.RowDataPacket[][];
    if (users.length === 0) {
      return NextResponse.json(
        { error: "User does not exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Insert new user
    const [result] = await db.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [hashedPassword, email]
    );

    // Send verification email
    await sendEmail({ email, emailType: "RESET" });

    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}