// src/app/blogs/[slug]/chapter/[chapter]/page.jsx

import React from "react";
import fs from "fs";
import matter from "gray-matter";
import BlogContent from "@/components/BlogContent";

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

export default async function BlogChapterPage({ params }) {
  const { slug, chapter } = params;
  const post = await getPostContent(slug);

  // Handle case where post or chapter is not found
  if (!post || !post.chapters[chapter - 1]) {
    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-500">Chapter not found.</p>
      </main>
    );
  }

  return <BlogContent post={post} chapter={parseInt(chapter)} />;
}
