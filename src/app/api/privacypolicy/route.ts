import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma";

// post privacy policy

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, content } = reqBody;

    const res = await prisma.privacyPolicy.create({
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

// get

export async function GET() {
  try {
    const res = await prisma.privacyPolicy.findMany();
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}