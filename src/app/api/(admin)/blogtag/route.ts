import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Add new blog tag
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { tag_name, publication_status } = reqBody;

    // Insert new blog tag
    const newBlogTag = await prisma.blogTag.create({
      data: {
        tag_name,
        publication_status,
      },
    });

    return NextResponse.json({
      message: "Blog tag created successfully",
      success: true,
      blogTag: newBlogTag,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all blog tags
export async function GET() {
  try {
    const blogTags = await prisma.blogTag.findMany();
    return NextResponse.json(blogTags);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

