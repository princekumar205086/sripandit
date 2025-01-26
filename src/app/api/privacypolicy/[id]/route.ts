import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

interface params {
  id: number;
}

export async function GET(request: Request, context: { params: params }) {
  try {
    const { id } = context.params;

    const res = await prisma.privacyPolicy.findUnique({
      where: { id: Number(id) },
    });
    if (!res) {
      throw new Error("Privacy policy not found");
    }
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// update privacy policy

export async function PUT(
  request: NextRequest,
  context: { params: { id: number } }
) {
  try {
    const { id } = context.params;
    const reqBody = await request.json();
    const { title, content } = reqBody;

    const res = await prisma.privacyPolicy.update({
      where: { id: Number(id) },
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

// delete privacy policy

export async function DELETE(request: NextRequest,context: { params: { id: number } }) {
  try {
    const { id } = context.params;

    const res = await prisma.privacyPolicy.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}