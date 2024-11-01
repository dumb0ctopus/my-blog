// app/api/posts/route.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NextResponse } from "next/server";

export async function GET() {
  const postsDirectory = path.join(process.cwd(), "src/blogs");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContents);

    return {
      title: data.title,
      image: data.image || "/default-image.jpg",
      description: data.description || "",
      publishedAt: data.publishedAt || new Date().toISOString(),
      updatedAt: data.updatedAt || new Date().toISOString(),
      author: data.author || "Unknown Author",
      isPublished: data.isPublished || false,
      tags: data.tags || [],
      slug: filename.replace(".mdx", ""),
    };
  });

  return NextResponse.json(posts);
}
