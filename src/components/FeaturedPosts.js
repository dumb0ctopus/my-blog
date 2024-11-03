// src/components/FeaturedPosts.js
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import slugify from "@/utils/slugify";

export default function FeaturedPosts({ posts }) {
  return (
    <div className="space-y-6 w-full">
      {posts.slice(0, 3).map((post) => (
        <div
          key={post.slug}
          className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:mx-0 mx-7"
        >
          {/* Image */}
          <Link
            href={`/blogs/${post.slug}`}
            className="sm:w-1/3 h-full rounded-xl overflow-hidden flex-shrink-0"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={post.image.width || 600}
              height={post.image.height || 400}
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              placeholder="blur"
              blurDataURL="/placeholder.png"
              sizes="(max-width: 640px) 100vw, (min-width: 640px) 33vw"
            />
          </Link>

          {/* Content */}
          <div className="mt-4 sm:mt-0 sm:w-2/3">
            {/* Tag */}
            {post.tags[0] && (
              <Link
                href={`/categories/${slugify(post.tags[0])}`}
                className="inline-block uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm"
              >
                {post.tags[0]}
              </Link>
            )}

            {/* Title */}
            <Link href={`/blogs/${post.slug}`} className="block my-2">
              <h2 className="font-semibold capitalize text-base sm:text-lg md:text-xl">
                <span className="bg-gradient-to-r from-accent dark:from-accentDark bg-[length:0_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-all duration-500">
                  {post.title}
                </span>
              </h2>
            </Link>

            {/* Date */}
            <span className="block text-gray-500 dark:text-gray-300 text-xs sm:text-base">
              {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
