import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Delete a job opening
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Job opening ID is required" },
        { status: 400 }
      );
    }

    const jobOpening = await prisma.jobOpening.findUnique({
      where: { id: parseInt(id) },
    });

    if (!jobOpening) {
      return NextResponse.json(
        { error: "Job opening not found" },
        { status: 404 }
      );
    }

    await prisma.jobOpening.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      message: "Job opening deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a job opening
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const reqBody = await request.json();
    const { title, description, deadline } = reqBody;

    if (!id) {
      return NextResponse.json(
        { error: "Job opening ID is required" },
        { status: 400 }
      );
    }

    const updatedJobOpening = await prisma.jobOpening.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        deadline: new Date(deadline),
      },
    });

    return NextResponse.json({
      message: "Job opening updated successfully",
      success: true,
      jobOpening: updatedJobOpening,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch a single job opening by ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Job opening ID is required" },
        { status: 400 }
      );
    }

    const jobOpening = await prisma.jobOpening.findUnique({
      where: { id: parseInt(id) },
    });

    if (!jobOpening) {
      return NextResponse.json(
        { error: "Job opening not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(jobOpening);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
