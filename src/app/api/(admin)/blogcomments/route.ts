import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Add new blog comment
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { post_id, user_id, comment_text } = reqBody;

    // Insert new blog comment
    const newBlogComment = await prisma.blogComments.create({
      data: {
        post_id,
        user_id,
        comment_text,
      },
    });

    return NextResponse.json({
      message: "Blog comment created successfully",
      success: true,
      blogComment: newBlogComment,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all blog comments
export async function GET() {
  try {
    const blogComments = await prisma.blogComments.findMany();
    return NextResponse.json(blogComments);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
