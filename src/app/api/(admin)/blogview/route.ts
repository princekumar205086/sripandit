import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Add new blog view
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { post_id, user_id } = reqBody;

    // Insert new blog view
    const newBlogView = await prisma.blogView.create({
      data: {
        post_id,
        user_id,
      },
    });

    return NextResponse.json({
      message: "Blog view created successfully",
      success: true,
      blogView: newBlogView,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all blog views
export async function GET() {
  try {
    const blogViews = await prisma.blogView.findMany();
    return NextResponse.json(blogViews);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
