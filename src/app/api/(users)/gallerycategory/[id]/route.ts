import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Delete a gallery category
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
      const { id } = context.params;
  
      if (!id) {
        return NextResponse.json(
          { error: "Gallery category ID is required" },
          { status: 400 }
        );
      }
  
      const galleryCategory = await prisma.galleryCategory.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!galleryCategory) {
        return NextResponse.json({ error: "Gallery category not found" }, { status: 404 });
      }
  
      await prisma.galleryCategory.delete({
        where: { id: parseInt(id) },
      });
  
      return NextResponse.json({
        message: "Gallery category deleted successfully",
        success: true,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  // Update a gallery category
  export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
      const { id } = context.params;
      const reqBody = await request.json();
      const { title, status } = reqBody;
  
      if (!id) {
        return NextResponse.json(
          { error: "Gallery category ID is required" },
          { status: 400 }
        );
      }
  
      const updatedGalleryCategory = await prisma.galleryCategory.update({
        where: { id: parseInt(id) },
        data: {
          title,
          status,
        },
      });
  
      return NextResponse.json({
        message: "Gallery category updated successfully",
        success: true,
        galleryCategory: updatedGalleryCategory,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  // Fetch a single gallery category by ID
  export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
      const { id } = context.params;
  
      if (!id) {
        return NextResponse.json(
          { error: "Gallery category ID is required" },
          { status: 400 }
        );
      }
  
      const galleryCategory = await prisma.galleryCategory.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!galleryCategory) {
        return NextResponse.json(
          { error: "Gallery category not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(galleryCategory);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }