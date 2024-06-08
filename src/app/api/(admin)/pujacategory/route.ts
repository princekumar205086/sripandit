// pages/api/puja_category.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name } = reqBody;

    // Check if category already exists
    const existingCategory = await prisma.pujaCategory.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 400 }
      );
    }

    // Insert new category
    const newCategory = await prisma.pujaCategory.create({
      data: {
        name,
      },
    });

    return NextResponse.json({
      message: "Category created successfully",
      success: true,
      name: newCategory.name,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// for fetching all categories
export async function GET() {
  try {
    const categories = await prisma.pujaCategory.findMany();
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}