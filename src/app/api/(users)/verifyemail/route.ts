import connectToDB from '@/dbConfig/db'
import { NextRequest, NextResponse } from "next/server";
import mysql2 from 'mysql2';

export async function POST(request: NextRequest) {
  // Assuming you have a connection pool
  const pool = await connectToDB();
  if (!pool) {
    return NextResponse.json({ message: "Failed to connect to database" });
  }
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const [rows] = await pool.query(
        "SELECT * FROM users WHERE verifyToken = ? AND verifyTokenExpiry > ?",
        [token, new Date()]
      ) as mysql2.RowDataPacket[];
      
      if (rows.length === 0) {
        return NextResponse.json({ error: "Invalid token" }, { status: 400 });
      }
      
      const user = rows[0];
      console.log(user);

    await pool.query(
      "UPDATE users SET isVerified = ?, verifyToken = ?, verifyTokenExpiry = ? WHERE id = ?",
      [true, null, null, user.id]
    );

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
