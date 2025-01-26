import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Delete a blog comment
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Blog comment ID is required" },
        { status: 400 }
      );
    }

    const blogComment = await prisma.blogComments.findUnique({
      where: { id: parseInt(id) },
    });

    if (!blogComment) {
      return NextResponse.json(
        { error: "Blog comment not found" },
        { status: 404 }
      );
    }

    await prisma.blogComments.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      message: "Blog comment deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a blog comment
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const reqBody = await request.json();
    const { post_id, user_id, comment_text } = reqBody;

    if (!id) {
      return NextResponse.json(
        { error: "Blog comment ID is required" },
        { status: 400 }
      );
    }

    const updatedBlogComment = await prisma.blogComments.update({
      where: { id: parseInt(id) },
      data: {
        post_id,
        user_id,
        comment_text,
      },
    });

    return NextResponse.json({
      message: "Blog comment updated successfully",
      success: true,
      blogComment: updatedBlogComment,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch a single blog comment by ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Blog comment ID is required" },
        { status: 400 }
      );
    }

    const blogComment = await prisma.blogComments.findUnique({
      where: { id: parseInt(id) },
    });

    if (!blogComment) {
      return NextResponse.json(
        { error: "Blog comment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blogComment);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
