import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

interface params {
  id: number;
}

export async function GET(request: Request, context: { params: params }) {
  try {
    const { id } = context.params;

    const res = await prisma.blogCategory.findUnique({
      where: { id: Number(id) },
    });
    if (!res) {
      throw new Error("Blog category not found");
    }
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// update blog category

export async function PUT(
  request: NextRequest,
  context: { params: { id: number } }
) {
  try {
    const { id } = context.params;
    const reqBody = await request.json();
    const {
      user_id,
      category_name,
      meta_title,
      meta_keyword,
      meta_description,
      publication_status,
    } = reqBody;

    // Check if user is an admin
    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "You are not allowed to perform this operation" },
        { status: 403 }
      );
    }

    // Check if category exists
    const existingCategory = await prisma.blogCategory.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Update category
    const category_slug = slugify(category_name, { lower: true });
    const updatedCategory = await prisma.blogCategory.update({
      where: { id: Number(id) },
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
      message: "Category updated successfully",
      success: true,
      category: updatedCategory,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Unique constraint failed on the fields: (category_slug)" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// delete blog category

export async function DELETE(
  request: NextRequest,
  context: { params: params }
) {
  try {
    const { id } = context.params;

    // Check if category exists
    const existingCategory = await prisma.blogCategory.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Delete category
    await prisma.blogCategory.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "Category deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
