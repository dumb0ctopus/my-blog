// src/pages/blog/[slug].jsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "markdown-to-jsx";
import getPostMetadata from "@/utils/getPostMetadata";
import fs from "fs";
import matter from "gray-matter";
import RecentPosts from "@/components/RecentPosts";
import slugify from "@/utils/slugify";
import { format } from "date-fns";

// Custom date formatting for BC dates
function formatCustomDate(publishedAt) {
  if (typeof publishedAt === "string" && publishedAt.includes("BC")) {
    const [yearBC, ...rest] = publishedAt.split(" ");
    return `${yearBC} BC`;
  } else {
    return format(new Date(publishedAt), "dd, MMMM, yyyy");
  }
}

// Fetch post content
function getPostContent(slug) {
  const folder = "src/blogs/";
  const file = `${folder}${slug}.mdx`;

  if (!fs.existsSync(file)) {
    return null;
  }

  const content = fs.readFileSync(file, "utf-8");
  const matterResult = matter(content);
  return matterResult;
}

// Get author name or fallback if undefined
function getAuthorName(author) {
  return author || "Unknown Author"; // Fallback if author is missing
}

export default function BlogPage({ params }) {
  const slug = params.slug;
  const post = getPostContent(slug);

  // Handle case where post is not found
  if (!post) {
    return (
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-500">Post not found.</p>
      </main>
    );
  }

  // Fetch all posts to determine similar posts
  const allPosts = getPostMetadata("src/blogs");
  const primaryTag = post.data.tags[0] || "";

  const similarPosts = allPosts.filter(
    (p) => p.slug !== slug && p.tags.includes(primaryTag)
  );

  return (
    <main className="container mx-auto px-4 sm:px-40 lg:px-72 py-8 mt-11">
      <article className="text-gray-950 dark:text-white dark:bg-gray-950 p-6 rounded-lg">
        {/* Title Section */}
        <header className="mb-8 text-center">
          <h1 className="font-semibold capitalize text-3xl md:text-4xl lg:text-5xl leading-tight">
            {post.data.title}
          </h1>
          <h3 className="text-gray-600 dark:text-gray-400 mt-2">
            {getAuthorName(post.data.author)}
          </h3>
        </header>

        {/* Blog Image */}
        {post.data.image && (
          <div className="mb-8 relative w-full h-64 md:h-96 rounded-xl overflow-hidden group">
            <Image
              src={post.data.image}
              alt={post.data.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              placeholder="blur"
              blurDataURL="/placeholder.png"
            />
          </div>
        )}

        {/* Published Date and Tag */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          {/* Published Date */}
          <span className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
            {formatCustomDate(post.data.publishedAt)}
          </span>

          {/* Tag */}
          {primaryTag && (
            <Link
              href={`/categories/${slugify(primaryTag)}`}
              className="inline-block uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm"
            >
              {primaryTag}
            </Link>
          )}
        </div>

        {/* Blog Content */}
        <div className="prose dark:prose-dark max-w-none mb-12">
          <Markdown
            options={{
              overrides: {
                img: {
                  component: ({ src, alt }) => null, // Remove image rendering from markdown
                },
                h1: {
                  component: ({ children }) => (
                    <h1 className="text-2xl font-bold my-4">{children}</h1>
                  ),
                },
                h2: {
                  component: ({ children }) => (
                    <h2 className="text-xl font-semibold my-3">{children}</h2>
                  ),
                },
                p: {
                  component: ({ children }) => (
                    <p className="text-base leading-7 my-2">{children}</p>
                  ),
                },
              },
            }}
          >
            {post.content}
          </Markdown>
        </div>

        {/* Similar Posts Section */}
        {similarPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Similar Posts</h2>
            <RecentPosts posts={similarPosts} />
          </section>
        )}
      </article>
    </main>
  );
}
