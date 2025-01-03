// src/app/blogs/[slug]/page.jsx

import React from "react";
import fs from "fs";
import matter from "gray-matter";
import BlogContent from "@/components/BlogContent";
import getPostMetadata from "@/utils/getPostMetadata";

// Function to split the blog content into chapters based on <h1> tags.
function splitContentIntoChapters(content) {
  const chapters = content
    .split(/<h1.*?>/)
    .slice(1)
    .map((chapter, index) => ({
      id: index + 1,
      content: `<h1>${chapter.trim()}`,
    }));
  return chapters.length > 0 ? chapters : [{ id: 1, content }];
}

// Fetch post content
async function getPostContent(slug) {
  const folder = "src/blogs/";
  const file = `${folder}${slug}.mdx`;

  if (!fs.existsSync(file)) {
    return null;
  }

  const content = fs.readFileSync(file, "utf-8");
  const matterResult = matter(content);
  const chapters = splitContentIntoChapters(matterResult.content);

  // Return only the serializable parts of the matterResult object
  return {
    data: matterResult.data,
    chapters,
    slug,
    content: matterResult.content,
  };
}

export default async function BlogPage({ params }) {
  const slug = params.slug;
  const post = await getPostContent(slug);

  if (!post) {
    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-500">Post not found.</p>
      </main>
    );
  }

  // Fetch all posts to determine similar posts
  const allPosts = getPostMetadata();
  const primaryTag = post.data.tags[0] || "";

  const similarPosts = allPosts.filter(
    (p) => p.slug !== slug && p.tags.includes(primaryTag)
  );

  return (
    <BlogContent
      post={post}
      similarPosts={similarPosts}
      chapter={post.chapters.length > 1 ? 1 : undefined}
    />
  );
}
