// src/utils/getPostMetadata.js

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function getPostMetadata(basePath = "src/blogs") {
  const folder = path.join(process.cwd(), basePath, "/"); // Ensures correct path
  console.log(`Reading posts from: ${folder}`);

  if (!fs.existsSync(folder)) {
    console.error(`Directory not found at ${folder}`);
    return []; // Handle the error gracefully
  }

  const files = fs.readdirSync(folder);
  console.log(`Found ${files.length} files in ${folder}`);

  const markdownPosts = files.filter((file) => file.endsWith(".mdx"));
  console.log(`Found ${markdownPosts.length} markdown (.mdx) files.`);

  if (markdownPosts.length === 0) {
    console.warn(`No markdown files found in ${folder}.`);
    return [];
  }

  // Extract metadata from each markdown file
  const posts = markdownPosts
    .map((filename) => {
      const filePath = path.join(folder, filename);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const matterResult = matter(fileContents);

      // Validate required fields
      if (!matterResult.data.title) {
        console.warn(`Missing title in ${filename}. Skipping this post.`);
        return null;
      }

      return {
        title: matterResult.data.title,
        image: matterResult.data.image || "/default-image.jpg",
        description: matterResult.data.description || "",
        publishedAt: matterResult.data.publishedAt || new Date().toISOString(),
        updatedAt: matterResult.data.updatedAt || new Date().toISOString(),
        author: matterResult.data.author || "Unknown Author",
        isPublished: matterResult.data.isPublished || false,
        tags: matterResult.data.tags || [],
        slug: filename.replace(".mdx", ""),
        content: matterResult.content, // Include the body content
      };
    })
    .filter((post) => post !== null); // Remove null entries

  console.log(`Returning ${posts.length} posts after processing.`);

  // Sort posts by publishedAt in descending order
  posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return posts;
}
