import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Add new blog like
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { post_id, user_id } = reqBody;

    // Insert new blog like
    const newBlogLike = await prisma.blogLikes.create({
      data: {
        post_id,
        user_id,
      },
    });

    return NextResponse.json({
      message: "Blog like created successfully",
      success: true,
      blogLike: newBlogLike,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all blog likes
export async function GET() {
  try {
    const blogLikes = await prisma.blogLikes.findMany();
    return NextResponse.json(blogLikes);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

