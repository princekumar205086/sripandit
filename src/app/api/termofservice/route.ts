import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// post term of service

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, content } = reqBody;

    const res = await prisma.termsOfService.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// get term of service

export async function GET() {
  try {
    const res = await prisma.termsOfService.findMany();
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}