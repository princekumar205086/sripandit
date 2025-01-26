import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Add new blog post tag
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { post_id, tag_id } = reqBody;

    // Insert new blog post tag
    const newBlogPostTag = await prisma.blogPost_tag.create({
      data: {
        post_id,
        tag_id,
      },
    });

    return NextResponse.json({
      message: "Blog post tag created successfully",
      success: true,
      blogPostTag: newBlogPostTag,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all blog post tags
export async function GET() {
  try {
    const blogPostTags = await prisma.blogPost_tag.findMany();
    return NextResponse.json(blogPostTags);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

