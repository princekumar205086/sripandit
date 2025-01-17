import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";

interface params {
  id: number;
}

export async function GET(request: Request, context: { params: params }) {
  try {
    const { id } = context.params;

    const res = await prisma.blogPost.findUnique({
      where: { id: Number(id) },
    });
    if (!res) {
      throw new Error("Blog post not found");
    }
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// update blog post

export async function PUT(
  request: NextRequest,
  context: { params: { id: number } }
) {
  try {
    const { id } = context.params;
    const formData = await request.formData();
    const file = formData.get("featured_image");

    let relativePath = "";

    if (file && file instanceof File) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type) || file.size > maxSize) {
        return NextResponse.json(
          { error: "Invalid file type or size" },
          { status: 400 }
        );
      }

      const byteData = await file.arrayBuffer();
      const buffer = Buffer.from(byteData);

      const uploadsDir = path.join(process.cwd(), "public", "blog_images");
      await fs.mkdir(uploadsDir, { recursive: true });

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadsDir, fileName);

      await fs.writeFile(filePath, buffer);

      relativePath = path.join("/blog_images", fileName).replace(/\\/g, "/");
    }

    const user_id = parseInt(formData.get("user_id")?.toString() || "0");
    const category_id = parseInt(
      formData.get("category_id")?.toString() || "0"
    );
    const post_title = formData.get("post_title")?.toString() || "";
    const post_slug = formData.get("post_slug")?.toString() || "";
    const post_description = formData.get("post_description")?.toString() || "";
    const youtube_url = formData.get("youtube_url")?.toString() || "";
    const publication_status = formData
      .get("publication_status")
      ?.toString() as "TRUE" | "FALSE" | undefined;
    const is_featured = formData.get("is_featured")?.toString() === "true";
    const meta_title = formData.get("meta_title")?.toString() || "";
    const meta_keyword = formData.get("meta_keyword")?.toString() || "";
    const meta_description = formData.get("meta_description")?.toString() || "";

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

    // Update blog post
    const updatedPost = await prisma.blogPost.update({
      where: { id: Number(id) },
      data: {
        user_id,
        category_id,
        post_title,
        post_slug,
        post_description,
        featured_image: relativePath || undefined,
        youtube_url,
        publication_status,
        is_featured,
        meta_title,
        meta_keyword,
        meta_description,
      },
    });

    return NextResponse.json({
      message: "Blog post updated successfully",
      success: true,
      post: updatedPost,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Unique constraint failed on the fields: (category_slug)" },
        { status: 400 }
      );
    }
  }
}

//   delete blog post

export async function DELETE(
  request: NextRequest,
  context: { params: { id: number } }
) {
  try {
    const { id } = context.params;

    const post = await prisma.blogPost.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    await prisma.blogPost.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: "Blog post deleted successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
