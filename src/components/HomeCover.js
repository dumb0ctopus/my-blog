// components/HomeCover.js
import Image from "next/image";
import Link from "next/link";
import slugify from "@/utils/slugify"; // Import slugify function

export default function HomeCover({ post }) {
  return (
    <article className="relative rounded-3xl overflow-hidden w-full max-w-full mx-auto group">
      {/* Background Image wrapped in Link */}
      <Link href={`/blogs/${post.slug}`} className="block">
        <Image
          src={post.image}
          alt={`Cover image for ${post.title}`}
          width={1200} // Use actual image dimensions for better optimization
          height={600}
          className="object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105"
          placeholder="blur"
          blurDataURL="/placeholder.png"
          priority={true} // Prioritize loading for above-the-fold content
        />
      </Link>

      {/* Gradient Overlay with pointer-events-none */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 pointer-events-none"></div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-12 lg:p-16 text-white z-20 w-full">
        {/* Tag */}
        {post.tags && post.tags.length > 0 && (
          <Link
            href={`/categories/${slugify(post.tags[0])}`}
            className="inline-block bg-gray-800 bg-opacity-75 text-xs sm:text-sm font-semibold rounded-full py-1 px-3 mb-4 cursor-pointer hover:bg-opacity-90 transition-opacity duration-300"
          >
            {post.tags[0]}
          </Link>
        )}

        {/* Title */}
        <Link href={`/blogs/${post.slug}`} className="block">
          <h2 className="font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-accent/100 dark:from-accentDark/70 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-all duration-500">
              {post.title}
            </span>
          </h2>
        </Link>

        {/* Description */}
        {post.description && (
          <p className="hidden sm:block text-sm sm:text-base md:text-lg font-light">
            {post.description}
          </p>
        )}
      </div>
    </article>
  );
}
