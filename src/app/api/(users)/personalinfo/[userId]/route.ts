import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { create } from "domain";

// Delete a personal information entry
export async function DELETE(request: NextRequest) {
  try {
    const personalInfoId = request.nextUrl.searchParams.get("personalInfoId");

    if (!personalInfoId) {
      return NextResponse.json(
        { error: "Personal Information ID is required" },
        { status: 400 }
      );
    }

    await prisma.personalInformation.delete({
      where: { id: parseInt(personalInfoId) },
    });

    return NextResponse.json({
      message: "Personal information deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// fetch personal information by userId

export async function GET(
  request: NextRequest,
  context: { params: { userId: string } }
) {
  try {
    const { userId } = context.params;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const personalInfos = await prisma.personalInformation.findMany({
      where: { user: { id: parseInt(userId) } },
    });

    return NextResponse.json(personalInfos);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
