// components/HomeCover.js or components/HomeCover.tsx
import Image from "next/image";
import Link from "next/link";
import slugify from "@/utils/slugify"; // Import slugify function

export default function HomeCover({ post }) {
  return (
    <article className="relative rounded-3xl overflow-hidden shadow-lg w-full max-w-[700px] mx-auto group">
      {/* Background Image wrapped in Link */}
      <Link href={`/blogs/${post.slug}`} className="block">
        <Image
          src={post.image}
          alt={post.title}
          layout="responsive"
          width={100}
          height={100}
          className="object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105"
          placeholder="blur"
          blurDataURL="/placeholder.png"
        />
      </Link>

      {/* Gradient Overlay with pointer-events-none */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 pointer-events-none"></div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-12 lg:p-16 text-white z-20 w-full">
        {/* Tag */}
        {post.tags && post.tags[0] && (
          <Link href={`/categories/${slugify(post.tags[0])}`}>
            <span className="inline-block bg-gray-800 bg-opacity-75 text-xs sm:text-sm font-semibold rounded-full py-1 px-3 mb-4 cursor-pointer">
              {post.tags[0]}
            </span>
          </Link>
        )}

        {/* Title */}
        <Link href={`/blogs/${post.slug}`} className="block">
          <h1 className="font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-accent/100 dark:from-accentDark/70 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-all duration-500">
              {post.title}
            </span>
          </h1>
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
