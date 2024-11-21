// components/HomePage.js
import React from "react";
import Head from "next/head";
import HomeCover from "@/components/HomeCover";
import FeaturedPosts from "@/components/FeaturedPosts";
import RecentPosts from "@/components/RecentPosts";
import getPostMetadata from "@/utils/getPostMetadata";
import Link from "next/link";

export default function HomePage(props) {
  // Fetch posts metadata
  const posts = getPostMetadata();

  // Check if posts array is not empty to prevent errors
  if (!posts || posts.length === 0) {
    return (
      <>
        <Head>
          <title>Jesuloluwa</title>
          <meta
            name="description"
            content="Welcome to Jesuloluwa's blog. Discover posts on various topics."
          />
          {/* Open Graph Meta Tags */}
          <meta property="og:title" content="Jesuloluwa" />
          <meta
            property="og:description"
            content="Welcome to Jesuloluwa's blog. Discover posts on various topics."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.jesuloluwa.com/" />
          <meta
            property="og:image"
            content="https://www.jesuloluwa.com/images/og-image.png"
          />
          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Jesuloluwa" />
          <meta
            name="twitter:description"
            content="Welcome to Jesuloluwa's blog. Discover posts on various topics."
          />
          <meta
            name="twitter:image"
            content="https://www.jesuloluwa.com//images/og-image.png"
          />
        </Head>
        <main className="container mx-auto p-4 mt-32">
          <p className="text-center text-gray-500">No posts available.</p>
        </main>
      </>
    );
  }

  // Divide posts into sections
  const homecoverPost = posts[0];
  const featuredPosts = posts.slice(1, 4);
  const recentPosts = posts.slice(4);

  // Prepare structured data for featured and recent posts
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Jesuloluwa",
    url: "https://www.jesuloluwa.com/",
    description: "Welcome to Jesuloluwa.com. Discover posts on various topics.",
    publisher: {
      "@type": "Organization",
      name: "Jesuloluwa",
      logo: {
        "@type": "ImageObject",
        url: "https://www.jesuloluwa.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.jesuloluwa.com/",
    },
    blogPost: [
      ...featuredPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: `https://www.jesuloluwa.com/blogs/${post.slug}`,
        image: `https://www.jesuloluwa.com${post.image}`,
        datePublished: post.publishedAt,
        author: {
          "@type": "Person",
          name: post.author,
        },
        description: post.description,
      })),
      ...recentPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: `https://www.jesuloluwa.com/blogs/${post.slug}`,
        image: `https://www.jesuloluwa.com${post.image}`,
        datePublished: post.publishedAt,
        author: {
          "@type": "Person",
          name: post.author,
        },
        description: post.description,
      })),
    ],
  };

  return (
    <>
      <Head>
        <title>Your Blog Name</title>
        <meta
          name="description"
          content="Welcome to Jesuloluwa.com. Discover posts on various topics."
        />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Jesuloluwa" />
        <meta
          property="og:description"
          content="Welcome to Jesuloluwa.com. Discover posts on various topics."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.jesuloluwa.com/" />
        <meta
          property="og:image"
          content="https://www.jesuloluwa.com/images/og-image.png"
        />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jesuloluwa" />
        <meta
          name="twitter:description"
          content="Welcome to Jesuloluwa's blog. Discover posts on various topics."
        />
        <meta
          name="twitter:image"
          content="https://www.jesuloluwa.com/images/og-image.png"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <main className="max-w-7xl mx-auto p-4 mt-32 md:px-32 sm:px-14">
        {/* HomeCover Section */}
        <section className="mb-8">
          <HomeCover post={homecoverPost} />
        </section>

        {/* Featured Posts */}
        <section className="mb-5">
          <h2 className="text-3xl font-semibold mb-5 sm:mx-0 mx-7">
            Featured Posts
          </h2>
          <FeaturedPosts posts={featuredPosts} />
        </section>

        {/* Recent Posts */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-5 mx-7 sm:mx-0">
            Recent Posts
          </h2>
          <RecentPosts posts={recentPosts} />
        </section>

        {/* Show More Link */}
        <div className="justify-center text-center dark:text-yellow-400 text-accent">
          <Link
            href="/categories"
            className="text-lg font-medium hover:underline"
          >
            Show More
          </Link>
        </div>
      </main>
    </>
  );
}
