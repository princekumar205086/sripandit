// i want to get all details for a specific blog post

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/*

model BlogCategory {
  id                 Int              @id @default(autoincrement())
  user               User             @relation(fields: [user_id], references: [id], name: "UserBlogCategories")
  user_id            Int
  category_name      String
  category_slug      String           @unique
  meta_title         String
  meta_keyword       String
  meta_description   String
  publication_status Status           @default(FALSE)
  createdAt          DateTime         @default(now())
  updatedAt          DateTime         @default(now())
  blogPosts          BlogPost[]       @relation("CategoryBlogPosts")
}

model BlogPost {
  id                 Int              @id @default(autoincrement())
  user               User             @relation(fields: [user_id], references: [id], name: "UserBlogPosts")
  user_id            Int
  category           BlogCategory     @relation(fields: [category_id], references: [id], name: "CategoryBlogPosts")
  category_id        Int
  post_title         String
  post_slug          String           @unique
  post_description   String
  featured_image     String
  youtube_url        String?
  publication_status Status           @default(FALSE)
  is_featured        Boolean          @default(false)
  view_count         Int              @default(0)
  meta_title         String
  meta_keyword       String
  meta_description   String
  createdAt          DateTime         @default(now())
  updatedAt          DateTime         @default(now())
  blogTags           BlogPost_tag[]   @relation("PostBlogTags")
  blogComments       BlogComments[]   @relation("PostBlogComments")
  blogLikes          BlogLikes[]      @relation("PostBlogLikes")
  blogViews          BlogView[]       @relation("PostBlogViews")
}

model BlogTag {
  id                 Int              @id @default(autoincrement())
  tag_name           String           @unique
  publication_status Status           @default(FALSE)
  createdAt          DateTime         @default(now())
  updatedAt          DateTime         @default(now())
  blogPosts          BlogPost_tag[]   @relation("TagBlogPosts")
}

model BlogPost_tag {
  id       Int      @id @default(autoincrement())
  post     BlogPost @relation(fields: [post_id], references: [id], name: "PostBlogTags")
  post_id  Int
  tag      BlogTag  @relation(fields: [tag_id], references: [id], name: "TagBlogPosts")
  tag_id   Int
}

model BlogComments {
  id           Int       @id @default(autoincrement())
  post         BlogPost  @relation(fields: [post_id], references: [id], name: "PostBlogComments")
  post_id      Int
  user         User      @relation(fields: [user_id], references: [id], name: "UserBlogComments")
  user_id      Int
  comment_text String
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @default(now())
}

model BlogLikes {
  id        Int       @id @default(autoincrement())
  post      BlogPost  @relation(fields: [post_id], references: [id], name: "PostBlogLikes")
  post_id   Int
  user      User      @relation(fields: [user_id], references: [id], name: "UserBlogLikes")
  user_id   Int
  createdAt DateTime  @default(now())
  updatedAt DateTime  @default(now())
}

model BlogView {
  id        Int       @id @default(autoincrement())
  post      BlogPost  @relation(fields: [post_id], references: [id], name: "PostBlogViews")
  post_id   Int
  user      User      @relation(fields: [user_id], references: [id], name: "UserBlogViews")
  user_id   Int
  createdAt DateTime  @default(now())
}

i want to get all details for a specific blog post 
from blogcategory i want category_id, category_name
from blogpost i want post_title, post_description, featured_image, youtube_url, is_featured, view_count



*/

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Blog Post ID is required" },
        { status: 400 }
      );
    }
    const res = await prisma.blogPost.findUnique({
      where: { id: parseInt(id) },
      select: {
        post_title: true,
        post_description: true,
        featured_image: true,
        youtube_url: true,
        is_featured: true,
        view_count: true,
        category: {
          select: {
            id: true,
            category_name: true,
          },
        },
      },
    });
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
