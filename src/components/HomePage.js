// components/homepage.js
import React from "react";
import HomeCover from "@/components/HomeCover";
import FeaturedPosts from "@/components/FeaturedPosts";
import RecentPosts from "@/components/RecentPosts";
import TogglePostsAndTags from "@/components/TogglePostsAndTags"; // Corrected import path
import getPostMetadata from "@/utils/getPostMetadata";
import Link from "next/link";

export default function HomePage(props) {
  // Fetch posts metadata
  const posts = getPostMetadata();

  // Check if posts array is not empty to prevent errors
  if (!posts || posts.length === 0) {
    return (
      <main className="container mx-auto p-4 mt-32">
        <p className="text-center text-gray-500">No posts available.</p>
      </main>
    );
  }

  // Divide posts into sections
  const homecoverPost = posts[0];
  const featuredPosts = posts.slice(1, 4);
  const recentPosts = posts.slice(4);

  return (
    <main className="container mx-auto p-4 mt-32 md:px-32 sm:px-14">
      {/* HomeCover Section */}
      <section className="mb-8">
        <HomeCover post={homecoverPost} />
      </section>

      {/* Featured Posts and TogglePostsAndTags for Medium and Large Screens */}
      <div className="hidden md:flex mb-8">
        <div className="flex-1">
          <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-6">Featured Posts</h2>
            <FeaturedPosts posts={featuredPosts} />
          </section>
        </div>
        <div className="hidden max-w-sm w-full mt-11">
          <TogglePostsAndTags posts={posts} />
        </div>
      </div>

      {/* Featured Posts, Recent Posts, and TogglePostsAndTags for Small Screens */}
      <div className="md:hidden flex flex-col space-y-8 mb-8">
        <div>
          <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-6">Featured Posts</h2>
            <FeaturedPosts posts={featuredPosts} />
          </section>
        </div>
        <div>
          <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-6">Recent Posts</h2>
            <RecentPosts posts={recentPosts} />
          </section>
        </div>
      </div>

      {/* Recent Posts for Medium and Large Screens */}
      <div className="hidden md:block mb-8">
        <section>
          <h2 className="text-3xl font-semibold mb-6">Recent Posts</h2>
          <RecentPosts posts={recentPosts} />
        </section>
      </div>
        {/* more */}
        <div className="justify-center text-center dark:text-yellow-400 text-accent">
          <Link href="/categories">
            <p>Show More</p>
          </Link>
        </div>
    </main>
  );
}
