import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Add new cancellation refund policy
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, content } = reqBody;

    // Insert new cancellation refund policy
    const newPolicy = await prisma.cancellationRefundPolicy.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json({
      message: "Cancellation refund policy created successfully",
      success: true,
      policy: newPolicy,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all cancellation refund policies
export async function GET() {
  try {
    const policies = await prisma.cancellationRefundPolicy.findMany();
    return NextResponse.json(policies);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
