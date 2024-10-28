// src/pages/blog/[slug].jsx

import Markdown from "markdown-to-jsx";
import getPostMetadata from "@/utils/getPostMetadata";
import fs from "fs";
import matter from "gray-matter";
import AnimatedReadingIcon from "@/components/Icons/AnimatedReadingIcon"; // Import your animation component

function getPostContent(slug) {
  const folder = "src/blogs/";
  const file = folder + `${slug}.mdx`;
  const content = fs.readFileSync(file, "utf-8");

  const matterResult = matter(content);
  return matterResult;
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata("src/blogs");
  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata({ params }) {
  const id = params?.slug ? " | " + params?.slug : "";
  return {
    title: `Jesuloluwa ${id.replaceAll("-", " ")}`,
  };
}

export default function BlogPage({ params }) {
  const slug = params.slug;
  const post = getPostContent(slug);

  return (
    <main>
      <article className="dark:text-white dark:bg-gray-950 text-gray-950">
        {/* Hero Section */}
        <div className="mb-8 text-center relative w-full h-[100vh] flex items-center justify-center mt-[-100px]">
          {/* Animation */}
          <AnimatedReadingIcon width={500} height={150} className="mb-4" />
        </div>
        {/* Title */}
        <div className="flex flex-col items-center justify-center text-light mt-32">
          <h1 className="font-semibold capitalize text-2xl md:text-3xl lg:text-5xl leading-normal">
            {post.data.title}
          </h1>
            <span className="px-6 py-2 text-lg left-0 mb-4">
              {post.data.tags[0]}
            </span>
        </div>

        {/* Blog Content */}
        <div className="mt-8 px-5 md:px-10 mx-auto text-justify max-w-3xl w-full">
          <Markdown
            options={{
              overrides: {
                img: {
                  component: ({ src, alt }) => null, // Remove image rendering
                },
                h1: {
                  component: ({ children }) => (
                    <h1 className="text-2xl font-bold my-4">{children}</h1>
                  ),
                },
                h2: {
                  component: ({ children }) => (
                    <h2 className="text-xl font-semibold my-3">{children}</h2>
                  ),
                },
                p: {
                  component: ({ children }) => (
                    <p className="text-base leading-7 my-2">{children}</p>
                  ),
                },
              },
            }}
          >
            {post.content}
          </Markdown>
        </div>
      </article>
    </main>
  );
}
