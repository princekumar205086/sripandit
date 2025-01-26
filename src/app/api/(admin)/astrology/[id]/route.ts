import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: number;
}

export async function GET(request: NextRequest, context: { params: Params }) {
  try {
    // Extract service id from request query
    const { id } = context.params;

    const service = await prisma.astrologyService.findUnique({
      where: { id: Number(id) },
    });

    if (!service) {
      throw new Error("Service not found");
    }

    return NextResponse.json(service);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// delete astrology service

export async function DELETE(
  request: NextRequest,
  context: { params: Params }
) {
  try {
    // Extract service id from request query
    const { id } = context.params;

    const service = await prisma.astrologyService.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "Service deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
