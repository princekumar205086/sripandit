import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Add new gallery category
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, status } = reqBody;

    // Insert new gallery category
    const newGalleryCategory = await prisma.galleryCategory.create({
      data: {
        title,
        status,
      },
    });

    return NextResponse.json({
      message: "Gallery category created successfully",
      success: true,
      galleryCategory: newGalleryCategory,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Fetch all gallery categories
export async function GET() {
  try {
    const galleryCategories = await prisma.galleryCategory.findMany();
    return NextResponse.json(galleryCategories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
