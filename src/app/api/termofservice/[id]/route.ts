import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// get by id term of service

interface params {
  id: number;
}

export async function GET(request: Request, context: { params: params }) {
  try {
    const { id } = context.params;

    const res = await prisma.termsOfService.findUnique({
      where: { id: Number(id) },
    });
    if (!res) {
      throw new Error("Term of service not found");
    }
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// update term of service

export async function PUT(
  request: NextRequest,
  context: { params: { id: number } }
) {
  try {
    const { id } = context.params;
    const reqBody = await request.json();
    const { title, content } = reqBody;

    const res = await prisma.termsOfService.update({
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

// delete term of service

export async function DELETE(request: NextRequest, context: { params: { id: number } }) {
    try {
      const { id } = context.params;
  
      const res = await prisma.termsOfService.delete({
        where: { id: Number(id) },
      });
  
      return NextResponse.json(res);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }