import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";

// Delete a gallery
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Gallery ID is required" },
        { status: 400 }
      );
    }

    const gallery = await prisma.gallery.findUnique({
      where: { id: parseInt(id) },
    });

    if (!gallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }

    await prisma.gallery.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      message: "Gallery deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a gallery
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const title = formData.get("title") as string;
    const galleryCategoryId = formData.get("galleryCategoryId") as string;
    const popularity = formData.get("popularity") as string;
    const status = formData.get("status") as string;

    if (!id) {
      return NextResponse.json(
        { error: "Gallery ID is required" },
        { status: 400 }
      );
    }

    const galleryExists = await prisma.gallery.findUnique({
      where: { id: parseInt(id) },
    });

    if (!galleryExists) {
      return NextResponse.json({ success: false, error: "Gallery not found" });
    }

    // Handle file upload
    let imgPath = galleryExists.image;
    if (image) {
      const buffer = await image.arrayBuffer();
      const fileName = `${Date.now()}-${image.name}`;
      const uploadsDir = path.join(process.cwd(), "public/uploads"); // Ensure this path exists
      await fs.mkdir(uploadsDir, { recursive: true }); // Create the directory if it doesn't exist
      const filePath = path.join(uploadsDir, fileName);
      await fs.writeFile(filePath, Buffer.from(buffer));
      imgPath = `/uploads/${fileName}`; // Construct the path to be stored in the database
    }

    // Update gallery
    const updatedGallery = await prisma.gallery.update({
      where: { id: parseInt(id) },
      data: {
        image: imgPath,
        title,
        galleryCategoryId: parseInt(galleryCategoryId),
        popularity: parseInt(popularity),
        status,
      },
    });

    return NextResponse.json({
      message: "Gallery updated successfully",
      success: true,
      gallery: updatedGallery,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

// Fetch a single gallery by ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Gallery ID is required" },
        { status: 400 }
      );
    }

    const gallery = await prisma.gallery.findUnique({
      where: { id: parseInt(id) },
    });

    if (!gallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });
    }

    return NextResponse.json(gallery);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
