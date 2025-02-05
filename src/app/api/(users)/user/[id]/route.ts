import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// get all user detail along with their personal information for a specific user

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const res = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        personalInformation: true,
      },
    });
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// update user status by id

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const reqBody = await request.json();
    const { account_status } = reqBody;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: parseInt(id) },
      data: { account_status },
    });

    return NextResponse.json({
      message: "User status updated successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
