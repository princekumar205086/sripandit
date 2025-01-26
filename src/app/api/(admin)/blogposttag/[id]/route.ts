import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Delete a blog post tag
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
      const { id } = context.params;
  
      if (!id) {
        return NextResponse.json(
          { error: "Blog post tag ID is required" },
          { status: 400 }
        );
      }
  
      const blogPostTag = await prisma.blogPost_tag.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!blogPostTag) {
        return NextResponse.json({ error: "Blog post tag not found" }, { status: 404 });
      }
  
      await prisma.blogPost_tag.delete({
        where: { id: parseInt(id) },
      });
  
      return NextResponse.json({
        message: "Blog post tag deleted successfully",
        success: true,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  // Update a blog post tag
  export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
      const { id } = context.params;
      const reqBody = await request.json();
      const { post_id, tag_id } = reqBody;
  
      if (!id) {
        return NextResponse.json(
          { error: "Blog post tag ID is required" },
          { status: 400 }
        );
      }
  
      const updatedBlogPostTag = await prisma.blogPost_tag.update({
        where: { id: parseInt(id) },
        data: {
          post_id,
          tag_id,
        },
      });
  
      return NextResponse.json({
        message: "Blog post tag updated successfully",
        success: true,
        blogPostTag: updatedBlogPostTag,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  // Fetch a single blog post tag by ID
  export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
      const { id } = context.params;
  
      if (!id) {
        return NextResponse.json(
          { error: "Blog post tag ID is required" },
          { status: 400 }
        );
      }
  
      const blogPostTag = await prisma.blogPost_tag.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!blogPostTag) {
        return NextResponse.json(
          { error: "Blog post tag not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(blogPostTag);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }