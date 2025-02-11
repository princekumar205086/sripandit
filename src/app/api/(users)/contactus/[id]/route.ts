import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// fetch specific contact message

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const contactMessage = await prisma.contactUs.findUnique({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(contactMessage);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch contact message" },
      { status: 500 }
    );
  }
}

// update specific contact message status

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    const reqBody = await request.json();
    const { status } = reqBody;

    const updatedContactMessage = await prisma.contactUs.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return NextResponse.json(updatedContactMessage);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update contact message" },
      { status: 500 }
    );
  }
}

// delete specific contact message

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  try {
    await prisma.contactUs.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({
      message: "Contact message deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete contact message" },
      { status: 500 }
    );
  }
}
