// components/homepage.js
import React from "react";
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
      <div className="flex mb-5">
        <div className="flex-1">
          <section className="mb-5">
            <h2 className="text-3xl font-semibold mb-5 sm:mx-0 mx-7">Featured Posts</h2>
            <FeaturedPosts posts={featuredPosts} />
          </section>
        </div>
      </div>

      {/* Recent Posts for Medium and Large Screens */}
      <div className="block mb-8">
        <section>
          <h2 className="text-3xl font-semibold mb-5 mx-7 sm:mx-0">Recent Posts</h2>
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
