import { getTokenInfo } from "@/helpers/getTokeninfo";
import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/dbConfig/db";
import { User } from "@/models/usersModel";
import { RowDataPacket } from "mysql2";

export async function GET(request: NextRequest) {
  const db = await connectToDB();
  if (!db) {
    throw new Error("Failed to connect to database");
  }
  try {
    const userId = await getTokenInfo(request);
    const [users] = (await db.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ])) as RowDataPacket[][];

    if (users.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = users[0];
    delete user.password;

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
