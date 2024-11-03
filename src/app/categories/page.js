// app/categories/page.js
import React from "react";
import Link from "next/link";
import groupPostsByTag from "@/utils/groupPostsByTag";
import slugify from "@/utils/slugify";
import Image from "next/image";
import { format } from "date-fns";

export default function AllCategoriesPage() {
  const postsByTag = groupPostsByTag();

  // Flatten all posts into a single array
  const allPosts = Object.values(postsByTag).flat();

  // Get all unique tags for navigation
  const uniqueTags = Object.keys(postsByTag);

  return (
    <div className="container mx-auto p-6 mt-24">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-dark dark:text-light">
        All Blogs
      </h1>

      {/* Tag Navigation */}
      <div className="mb-6 flex flex-wrap gap-4">
        {/* All Button */}
        <Link
          href={`/categories`}
          className={`px-4 py-2 rounded bg-accent hover:bg-accentDark hover:text-dark dark:hover:text-white dark:hover:bg-accent dark:bg-accentDark dark:text-black text-light`}
        >
          #all
        </Link>

        {/* Individual Tag Buttons */}
        {uniqueTags.map((tag) => (
          <Link
            key={tag}
            href={`/categories/${slugify(tag)}`}
            className={`px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-dark dark:text-light`}
          >
            #{tag}
          </Link>
        ))}
      </div>

      {/* Display all posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPosts.map((post) => (
          <div
            key={post.slug}
            className="group flex flex-col items-center text-dark dark:text-light"
          >
            {/* Image Link */}
            <Link
              href={`/blogs/${post.slug}`}
              className="w-full h-full rounded-xl overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-full object-center object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-300"
                placeholder="blur"
                blurDataURL="/placeholder.png"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>

            {/* Content */}
            <div className="flex flex-col w-full mt-4">
              {/* Tag */}
              {post.tags[0] && (
                <span className="uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
                  <Link href={`/categories/${slugify(post.tags[0])}`}>
                    {post.tags[0]}
                  </Link>
                </span>
              )}

              {/* Title */}
              <Link href={`/blogs/${post.slug}`} className="block my-2">
                <h2 className="font-semibold capitalize text-base sm:text-lg">
                  <span className="bg-gradient-to-r from-accent dark:from-accentDark bg-[length:0_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-all duration-500">
                    {post.title}
                  </span>
                </h2>
              </Link>

              {/* Date */}
              <span className="capitalize text-gray-500 dark:text-gray-300 font-semibold text-sm sm:text-base">
                {format(new Date(post.publishedAt), "dd, MMMM, yyyy")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
