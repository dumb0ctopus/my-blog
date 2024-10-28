// components/FeaturedPosts.js or components/FeaturedPosts.tsx
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

export default function FeaturedPosts({ posts }) {
  return (
    <div className="space-y-6">
      {posts.slice(0, 3).map((post, index) => {
        if (index === 0) {
          // Blog Layout 1 for the first post
          return (
            <Link key={post.slug} href={`/blogs/${post.slug}`}>
              <div className="group inline-block overflow-hidden rounded-xl relative">
                {/* Gradient Overlay */}
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-transparent to-black opacity-50 rounded-xl z-10"></div>

                {/* Image */}
                <Image
                  src={post.image}
                  alt={post.title}
                  width={post.image.width || 600}
                  height={post.image.height || 400}
                  className="w-full h-auto object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  placeholder="blur"
                  blurDataURL="/placeholder.png"
                  sizes="(max-width: 800px) 100vw, 50vw"
                />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 p-4 z-20 w-1/2">
                  {/* Tag */}
                  {post.tags[0] && (
                    <span className="inline-block uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm mb-2">
                      {post.tags[0]}
                    </span>
                  )}

                  {/* Title */}
                  <h2 className="font-bold capitalize text-lg sm:text-xl md:text-2xl text-white">
                    <span className="bg-gradient-to-r from-accent dark:from-accentDark bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                      {post.title}
                    </span>
                  </h2>

                  {/* Date */}
                  <span className="block text-gray-300 text-xs sm:text-sm mt-2">
                    {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
                  </span>
                </div>
              </div>
            </Link>
          );
        } else if (index === 1 || index === 2) {
          // Blog Layout 2 for the second and third posts
          return (
            <div
              key={post.slug}
              className="group grid sm:grid-cols-12 gap-3 items-center"
            >
              {/* Image */}
              <Link
                href={`/blogs/${post.slug}`}
                className="col-span-12 md:col-span-4 h-full rounded-xl overflow-hidden"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  width={post.image.width || 600}
                  height={post.image.height || 400}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  placeholder="blur"
                  blurDataURL="/placeholder.png"
                  sizes="(max-width: 700px) 100vw, 50vw"
                />
              </Link>

              {/* Content */}
              <div className="col-span-12 sm:col-span-4">
                {/* Tag */}
                {post.tags[0] && (
                  <span className="inline-block uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
                    {post.tags[0]}
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
                <span className="block text-gray-500 dark:text-gray-300 text-xs sm:text-base">
                  {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
                </span>
              </div>
            </div>
          );
        } else {
          return null; // Only display first three posts
        }
      })}
    </div>
  );
}
