import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Delete a cancellation refund policy
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Policy ID is required" },
        { status: 400 }
      );
    }

    const policy = await prisma.cancellationRefundPolicy.findUnique({
      where: { id: parseInt(id) },
    });

    if (!policy) {
      return NextResponse.json({ error: "Policy not found" }, { status: 404 });
    }

    await prisma.cancellationRefundPolicy.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      message: "Policy deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a cancellation refund policy
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const reqBody = await request.json();
    const { title, content } = reqBody;

    if (!id) {
      return NextResponse.json(
        { error: "Policy ID is required" },
        { status: 400 }
      );
    }

    const updatedPolicy = await prisma.cancellationRefundPolicy.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json({
      message: "Policy updated successfully",
      success: true,
      policy: updatedPolicy,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch a single cancellation refund policy by ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Policy ID is required" },
        { status: 400 }
      );
    }

    const policy = await prisma.cancellationRefundPolicy.findUnique({
      where: { id: parseInt(id) },
    });

    if (!policy) {
      return NextResponse.json({ error: "Policy not found" }, { status: 404 });
    }

    return NextResponse.json(policy);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
