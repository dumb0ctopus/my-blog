// app/categories/page.js
import React from "react";
import Link from "next/link";
import Head from "next/head";
import groupPostsByTag from "@/utils/groupPostsByTag";
import slugify from "@/utils/slugify";
import Image from "next/image";
import { format } from "date-fns";

function formatCustomDate(publishedAt) {
  if (typeof publishedAt === "string" && publishedAt.includes("BC")) {
    const [yearBC, ...rest] = publishedAt.split(" ");
    return `${yearBC} BC`;
  } else {
    return format(new Date(publishedAt), "dd MMMM yyyy");
  }
}

export default function AllCategoriesPage() {
  const postsByTag = groupPostsByTag();
  const allPosts = Object.values(postsByTag).flat();
  const uniqueTags = Object.keys(postsByTag);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Jesuloluwa",
    description:
      "Browse all blog posts across various categories.",
    url: "https://www.jesuloluwa.com/categories",
    blogPost: allPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://www.jesuloluwa.com/blogs/${post.slug}`,
      datePublished: post.publishedAt,
      image: `https://www.jesuloluwa.com${post.image}`,
      author: {
        "@type": "Person",
        name: "Jesuloluwa", // Replace with dynamic author data if available
      },
    })),
  };

  return (
    <>
      <Head>
        <title>All Blogs - Jesuloluwa</title>
        <meta
          name="description"
          content="Browse all blog posts across various categories."
        />
        {/* Open Graph Tags */}
        <meta property="og:title" content="All Blogs - Jesuloluwa" />
        <meta
          property="og:description"
          content="Browse all blog posts across various categories on Your Site Name."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.jesuloluwa.com/categories" />
        <meta
          property="og:image"
          content="https://www.jesuloluwa.com/og-image.jpg"
        />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="All Blogs - Your Site Name" />
        <meta
          name="twitter:description"
          content="Browse all blog posts across various categories on Your Site Name."
        />
        <meta
          name="twitter:image"
          content="https://www.jesuloluwa.com/twitter-image.jpg"
        />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main className="container mx-auto p-6 mt-24">
        <header>
          <h1 className="text-3xl font-bold mb-6 text-dark dark:text-light">
            All Blogs
          </h1>
        </header>

        <nav
          aria-label="Category Navigation"
          className="mb-6 flex flex-wrap gap-4"
        >
          <Link
            href={`/categories`}
            className={`px-4 py-2 rounded bg-accent hover:bg-accentDark hover:text-dark dark:hover:text-white dark:hover:bg-accent dark:bg-accentDark dark:text-black text-light`}
          >
            #all
          </Link>

          {uniqueTags.map((tag) => (
            <Link
              key={tag}
              href={`/categories/${slugify(tag)}`}
              className={`px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-dark dark:text-light`}
            >
              #{tag}
            </Link>
          ))}
        </nav>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col items-center text-dark dark:text-light"
            >
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
                />
              </Link>

              <div className="flex flex-col w-full mt-4">
                {post.tags[0] && (
                  <span className="uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
                    <Link href={`/categories/${slugify(post.tags[0])}`}>
                      {post.tags[0]}
                    </Link>
                  </span>
                )}

                <Link href={`/blogs/${post.slug}`} className="block my-2">
                  <h2 className="font-semibold capitalize text-base sm:text-lg">
                    <span className="bg-gradient-to-r from-accent dark:from-accentDark bg-[length:0_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-all duration-500">
                      {post.title}
                    </span>
                  </h2>
                </Link>

                <span className="capitalize text-gray-500 dark:text-gray-300 font-semibold text-sm sm:text-base">
                  {formatCustomDate(post.publishedAt)}
                </span>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
