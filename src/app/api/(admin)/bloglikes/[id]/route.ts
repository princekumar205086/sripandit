import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Delete a blog like
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Blog like ID is required" },
        { status: 400 }
      );
    }

    const blogLike = await prisma.blogLikes.findUnique({
      where: { id: parseInt(id) },
    });

    if (!blogLike) {
      return NextResponse.json(
        { error: "Blog like not found" },
        { status: 404 }
      );
    }

    await prisma.blogLikes.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      message: "Blog like deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a blog like
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const reqBody = await request.json();
    const { post_id, user_id } = reqBody;

    if (!id) {
      return NextResponse.json(
        { error: "Blog like ID is required" },
        { status: 400 }
      );
    }

    const updatedBlogLike = await prisma.blogLikes.update({
      where: { id: parseInt(id) },
      data: {
        post_id,
        user_id,
      },
    });

    return NextResponse.json({
      message: "Blog like updated successfully",
      success: true,
      blogLike: updatedBlogLike,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch a single blog like by ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Blog like ID is required" },
        { status: 400 }
      );
    }

    const blogLike = await prisma.blogLikes.findUnique({
      where: { id: parseInt(id) },
    });

    if (!blogLike) {
      return NextResponse.json(
        { error: "Blog like not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blogLike);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
