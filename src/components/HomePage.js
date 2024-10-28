import HomeCover from "@/components/HomeCover";
import FeaturedPosts from "@/components/FeaturedPosts";
import RecentPosts from "@/components/RecentPosts";
import getPostMetadata from "@/utils/getPostMetadata";

export default function HomePage(props) {
  // Default to empty array
const posts = getPostMetadata();

  // Divide posts into sections
  const homecoverPost = posts[0];
  const featuredPosts = posts.slice(1, 4);
  const recentPosts = posts.slice(4);

  return (
    <main className="container mx-auto p-4 mt-32">
      {/* Homecover Section */}
      <section className="mb-8">
        <HomeCover post={homecoverPost} />
      </section>

      {/* Featured Posts Section */}
      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-6">Featured Posts</h2>
        <FeaturedPosts posts={featuredPosts} />
      </section>

      {/* Recent Posts Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Recent Posts</h2>
        <RecentPosts posts={recentPosts} />
      </section>
    </main>
  );
}
