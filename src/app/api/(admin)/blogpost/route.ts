import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';
import { Prisma } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("featured_image");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file found" }, { status: 400 });
    }

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

    const relativePath = path.join("/blog_images", fileName).replace(/\\/g, "/");

    const user_id = parseInt(formData.get("user_id")?.toString() || "0");
    const category_id = parseInt(formData.get("category_id")?.toString() || "0");
    const post_title = formData.get("post_title")?.toString() || "";
    const post_slug = formData.get("post_slug")?.toString() || "";
    const post_description = formData.get("post_description")?.toString() || "";
    const youtube_url = formData.get("youtube_url")?.toString() || "";
    const publication_status = formData.get("publication_status")?.toString() as "TRUE" | "FALSE" | undefined;
    const is_featured = formData.get("is_featured")?.toString() === "true";
    const meta_title = formData.get("meta_title")?.toString() || "";
    const meta_keyword = formData.get("meta_keyword")?.toString() || "";
    const meta_description = formData.get("meta_description")?.toString() || "";

    // Check if user is an admin
    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "You are not allowed to perform this operation" },
        { status: 403 }
      );
    }

    // Check if post slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { post_slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "Post slug already exists" },
        { status: 400 }
      );
    }

    // Insert new blog post
    const newPost = await prisma.blogPost.create({
      data: {
        user_id,
        category_id,
        post_title,
        post_slug,
        post_description,
        featured_image: relativePath,
        youtube_url,
        publication_status,
        is_featured,
        meta_title,
        meta_keyword,
        meta_description,
      },
    });

    return NextResponse.json({
      message: "Blog post created successfully",
      success: true,
      post: newPost,
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return NextResponse.json({ error: "Unique constraint failed on the fields: (post_slug)" }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// for fetching all blog posts
export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany();
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}