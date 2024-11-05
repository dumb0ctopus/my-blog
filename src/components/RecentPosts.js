// components/RecentPosts.js
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import slugify from "@/utils/slugify";

// Helper function to format dates
function formatCustomDate(publishedAt) {
  const date = new Date(publishedAt);
  if (typeof publishedAt === "string" && publishedAt.includes("BC")) {
    const [yearBC, ...rest] = publishedAt.split(" ");
    return `${yearBC} BC`;
  } else if (isValidDate(date)) {
    return format(date, "dd, MMMM, yyyy");
  } else {
    return "Unknown date";
  }
}

// Helper function to validate dates
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

export default function RecentPosts({ posts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => {
        const dateObj = new Date(post.publishedAt);
        const isValid = isValidDate(dateObj);
        return (
          <article
            key={post.slug}
            className="group flex flex-col items-center text-dark dark:text-light mx-7 sm:mx-0"
          >
            {/* Image Link */}
            <Link
              href={`/blogs/${post.slug}`}
              className="w-full h-full rounded-xl overflow-hidden"
            >
              <Image
                src={post.image}
                alt={`Image for ${post.title}`}
                width={600}
                height={400}
                className="w-full h-full object-center object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-300"
                placeholder="blur"
                blurDataURL="/placeholder.png"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy" // Ensure images are lazy-loaded
              />
            </Link>

            {/* Content */}
            <div className="flex flex-col w-full mt-4">
              {/* Tag */}
              {post.tags && post.tags.length > 0 && (
                <Link
                  href={`/categories/${slugify(post.tags[0])}`}
                  className="uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm hover:underline"
                  aria-label={`View more posts in ${post.tags[0]} category`}
                >
                  {post.tags[0]}
                </Link>
              )}

              {/* Title */}
              <Link href={`/blogs/${post.slug}`} className="block my-2">
                <h3 className="font-semibold capitalize text-base sm:text-lg">
                  <span className="bg-gradient-to-r from-accent dark:from-accentDark bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-all duration-500">
                    {post.title}
                  </span>
                </h3>
              </Link>

              {/* Author */}
              <span className="capitalize text-gray-500 dark:text-gray-300 font-semibold text-sm sm:text-base">
                By {post.author}
              </span>

              {/* Date */}
              {isValid ? (
                <time
                  className="capitalize text-gray-500 dark:text-gray-300 font-semibold text-sm sm:text-base"
                  dateTime={dateObj.toISOString()}
                >
                  {formatCustomDate(post.publishedAt)}
                </time>
              ) : (
                <time className="capitalize text-gray-500 dark:text-gray-300 font-semibold text-sm sm:text-base">
                  {formatCustomDate(post.publishedAt)}
                </time>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
