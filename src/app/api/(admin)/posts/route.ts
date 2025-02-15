import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

/*

i want fetch post detail along with post view, like count, comment for specific post by post id

here my all schema

model BlogPost {
  id                 Int            @id @default(autoincrement())
  user               User           @relation(fields: [user_id], references: [id], name: "UserBlogPosts")
  user_id            Int
  category           BlogCategory   @relation(fields: [category_id], references: [id], name: "CategoryBlogPosts")
  category_id        Int
  post_title         String
  post_slug          String         @unique
  post_description   String
  featured_image     String
  youtube_url        String?
  publication_status Status         @default(FALSE)
  is_featured        Boolean        @default(false)
  view_count         Int            @default(0)
  meta_title         String
  meta_keyword       String
  meta_description   String
  createdAt          DateTime       @default(now())
  updatedAt          DateTime       @default(now())
  blogTags           BlogPost_tag[] @relation("PostBlogTags")
  blogComments       BlogComments[] @relation("PostBlogComments")
  blogLikes          BlogLikes[]    @relation("PostBlogLikes")
  blogViews          BlogView[]     @relation("PostBlogViews")
}

model BlogComments {
  id           Int      @id @default(autoincrement())
  post         BlogPost @relation(fields: [post_id], references: [id], name: "PostBlogComments")
  post_id      Int
  user         User     @relation(fields: [user_id], references: [id], name: "UserBlogComments")
  user_id      Int
  comment_text String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @default(now())
}

model BlogLikes {
  id        Int      @id @default(autoincrement())
  post      BlogPost @relation(fields: [post_id], references: [id], name: "PostBlogLikes")
  post_id   Int
  user      User     @relation(fields: [user_id], references: [id], name: "UserBlogLikes")
  user_id   Int
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
}

model BlogView {
  id        Int      @id @default(autoincrement())
  post      BlogPost @relation(fields: [post_id], references: [id], name: "PostBlogViews")
  post_id   Int
  user      User     @relation(fields: [user_id], references: [id], name: "UserBlogViews")
  user_id   Int
  createdAt DateTime @default(now())
}
model BlogCategory {
  id                 Int        @id @default(autoincrement())
  user               User       @relation(fields: [user_id], references: [id], name: "UserBlogCategories")
  user_id            Int
  category_name      String
  category_slug      String     @unique
  meta_title         String
  meta_keyword       String
  meta_description   String
  publication_status Status     @default(FALSE)
  createdAt          DateTime   @default(now())
  updatedAt          DateTime   @default(now())
  blogPosts          BlogPost[] @relation("CategoryBlogPosts")
}

model BlogTag {
  id                 Int            @id @default(autoincrement())
  tag_name           String         @unique
  publication_status Status         @default(FALSE)
  createdAt          DateTime       @default(now())
  updatedAt          DateTime       @default(now())
  blogPosts          BlogPost_tag[] @relation("TagBlogPosts")
}

i want from blog post table(post_title, post_description, featured_image, youtube_url, meta_title, meta_keyword, meta_description, is_featured, publication_status)
from blog view table(view_count)
from blog comments table(comment_text, user_id from user table i want user_name)
from blog likes table(user_id, from user table i want user_name and want to count total like)
from blog tags table(tag_name)

*/

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    // Check if postId is provided and valid
    if (!postId || isNaN(Number(postId))) {
      return NextResponse.json(
        { error: "Valid Post ID is required" },
        { status: 400 }
      );
    }

    // Fetch post details
    const postDetails = await prisma.blogPost.findUnique({
      where: {
        id: parseInt(postId),
      },
      select: {
        post_title: true,
        post_description: true,
        featured_image: true,
        youtube_url: true,
        meta_title: true,
        meta_keyword: true,
        meta_description: true,
        is_featured: true,
        publication_status: true,
        view_count: true,
        blogComments: {
          select: {
            comment_text: true,
            user: {
              select: {
                username: true,
              },
            },
          },
        },
        blogLikes: {
          select: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
        blogTags: {
          select: {
            tag: {
              select: {
                tag_name: true,
              },
            },
          },
        },
        category: {
          select: {
            category_name: true,
          },
        },
      },
    });

    if (!postDetails) {
      return NextResponse.json(
        { error: "Post details not found" },
        { status: 404 }
      );
    }

    // Count total likes
    const totalLikes = await prisma.blogLikes.count({
      where: {
        post_id: parseInt(postId),
      },
    });

    // Prepare the response
    const response = {
      ...postDetails,
      totalLikes,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
