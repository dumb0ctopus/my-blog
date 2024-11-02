// app/api/blogs/route.js

import { NextResponse } from "next/server";
import getPostMetadata from "@/utils/getPostMetadata";

export async function GET() {
  try {
    const posts = getPostMetadata();

    // Filter published posts and map to necessary fields, including content
    const publishedPosts = posts
      .filter((post) => post.isPublished)
      .map((post) => ({
        title: post.title,
        description: post.description,
        publishedAt: post.publishedAt,
        link: `/blogs/${post.slug}`,
        content: post.content, // Include the body content
      }));

    return NextResponse.json(publishedPosts);
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog data" },
      { status: 500 }
    );
  }
}
