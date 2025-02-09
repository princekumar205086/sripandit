import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// get all user detail along with their personal information

export async function GET(request: NextRequest) {
  try {
    const res = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        contact: true,
        date_of_reg: true,
        account_status: true,
        role: true,
        personalInformation: {
          select: {
            firstname: true,
            lastname: true,
            dob: true,
            profile_pic: true,
          },
        },
      },
    });
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
