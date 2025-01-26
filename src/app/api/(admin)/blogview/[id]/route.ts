import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Delete a blog view
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
      const { id } = context.params;
  
      if (!id) {
        return NextResponse.json(
          { error: "Blog view ID is required" },
          { status: 400 }
        );
      }
  
      const blogView = await prisma.blogView.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!blogView) {
        return NextResponse.json({ error: "Blog view not found" }, { status: 404 });
      }
  
      await prisma.blogView.delete({
        where: { id: parseInt(id) },
      });
  
      return NextResponse.json({
        message: "Blog view deleted successfully",
        success: true,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  // Update a blog view
  export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
      const { id } = context.params;
      const reqBody = await request.json();
      const { post_id, user_id } = reqBody;
  
      if (!id) {
        return NextResponse.json(
          { error: "Blog view ID is required" },
          { status: 400 }
        );
      }
  
      const updatedBlogView = await prisma.blogView.update({
        where: { id: parseInt(id) },
        data: {
          post_id,
          user_id,
        },
      });
  
      return NextResponse.json({
        message: "Blog view updated successfully",
        success: true,
        blogView: updatedBlogView,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  // Fetch a single blog view by ID
  export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
      const { id } = context.params;
  
      if (!id) {
        return NextResponse.json(
          { error: "Blog view ID is required" },
          { status: 400 }
        );
      }
  
      const blogView = await prisma.blogView.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!blogView) {
        return NextResponse.json(
          { error: "Blog view not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(blogView);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }