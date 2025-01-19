import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import slugify from 'slugify';

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { user_id, category_name, meta_title, meta_keyword, meta_description, publication_status } = reqBody;

    // Check if user is an admin
    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "You are not allowed to perform this operation" },
        { status: 403 }
      );
    }

    // Check if category already exists
    const existingCategory = await prisma.blogCategory.findFirst({
      where: { category_name },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 400 }
      );
    }

    // Insert new category
    const category_slug = slugify(category_name, { lower: true });
    const newCategory = await prisma.blogCategory.create({
      data: {
        user_id,
        category_name,
        category_slug,
        meta_title,
        meta_keyword,
        meta_description,
        publication_status,
      },
    });

    return NextResponse.json({
      message: "Category created successfully",
      success: true,
      category: newCategory,
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: "Unique constraint failed on the fields: (category_slug)" }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// for fetching all categories
export async function GET() {
  try {
    const categories = await prisma.blogCategory.findMany();
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}