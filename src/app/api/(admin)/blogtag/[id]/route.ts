import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Delete a blog tag
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
      const { id } = context.params;
  
      if (!id) {
        return NextResponse.json(
          { error: "Blog tag ID is required" },
          { status: 400 }
        );
      }
  
      const blogTag = await prisma.blogTag.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!blogTag) {
        return NextResponse.json({ error: "Blog tag not found" }, { status: 404 });
      }
  
      await prisma.blogTag.delete({
        where: { id: parseInt(id) },
      });
  
      return NextResponse.json({
        message: "Blog tag deleted successfully",
        success: true,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  // Update a blog tag
  export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
      const { id } = context.params;
      const reqBody = await request.json();
      const { tag_name, publication_status } = reqBody;
  
      if (!id) {
        return NextResponse.json(
          { error: "Blog tag ID is required" },
          { status: 400 }
        );
      }
  
      const updatedBlogTag = await prisma.blogTag.update({
        where: { id: parseInt(id) },
        data: {
          tag_name,
          publication_status,
        },
      });
  
      return NextResponse.json({
        message: "Blog tag updated successfully",
        success: true,
        blogTag: updatedBlogTag,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  // Fetch a single blog tag by ID
  export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
      const { id } = context.params;
  
      if (!id) {
        return NextResponse.json(
          { error: "Blog tag ID is required" },
          { status: 400 }
        );
      }
  
      const blogTag = await prisma.blogTag.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!blogTag) {
        return NextResponse.json(
          { error: "Blog tag not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(blogTag);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }