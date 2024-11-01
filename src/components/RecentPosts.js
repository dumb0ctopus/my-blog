// components/RecentPosts.js
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import slugify from "@/utils/slugify";

export default function RecentPosts({ posts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
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
                <span className="bg-gradient-to-r from-accent dark:from-accentDark bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
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
  );
}
