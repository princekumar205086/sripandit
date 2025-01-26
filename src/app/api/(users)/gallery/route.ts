import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";

// Add new gallery
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const galleryCategoryId = formData.get("galleryCategoryId") as string;
    const popularity = formData.get("popularity") as string;
    const status = formData.get("status") as string;

    if (!galleryCategoryId || isNaN(parseInt(galleryCategoryId))) {
      return NextResponse.json({
        success: false,
        error: "Invalid gallery category ID",
      });
    }

    const categoryExists = await prisma.galleryCategory.findUnique({
      where: { id: parseInt(galleryCategoryId) },
    });

    if (!categoryExists) {
      return NextResponse.json({
        success: false,
        error: "Gallery category not found",
      });
    }

    // Handle file upload
    let imgPath = "";
    if (image) {
      const buffer = await image.arrayBuffer();
      const fileName = `${Date.now()}-${image.name}`;
      const uploadsDir = path.join(process.cwd(), "public/uploads"); // Ensure this path exists
      await fs.mkdir(uploadsDir, { recursive: true }); // Create the directory if it doesn't exist
      const filePath = path.join(uploadsDir, fileName);
      await fs.writeFile(filePath, Buffer.from(buffer));
      imgPath = `/uploads/${fileName}`; // Construct the path to be stored in the database
    }

    // Insert new gallery
    const newGallery = await prisma.gallery.create({
      data: {
        image: imgPath,
        galleryCategoryId: parseInt(galleryCategoryId),
        popularity: parseInt(popularity),
        status,
      },
    });

    return NextResponse.json({
      message: "Gallery created successfully",
      success: true,
      gallery: newGallery,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

// Fetch all galleries
export async function GET() {
  try {
    const galleries = await prisma.gallery.findMany();
    return NextResponse.json(galleries);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
