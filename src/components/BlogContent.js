"use client"; // Mark this as a client component

import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Markdown from "markdown-to-jsx";
import RecentPosts from "@/components/RecentPosts";
import { format } from "date-fns";
import slugify from "@/utils/slugify";
import { FaBook } from "react-icons/fa";
import Modal from "react-modal";
import CloseIcon from "./Icons/CloseIcon";
import { Inter } from "@next/font/google";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

function formatCustomDate(publishedAt) {
  if (typeof publishedAt === "string" && publishedAt.includes("BC")) {
    const [yearBC] = publishedAt.split(" ");
    return `${yearBC} BC`;
  } else {
    try {
      return format(new Date(publishedAt), "dd MMMM yyyy");
    } catch (error) {
      return "Unknown Date";
    }
  }
}

function extractH1Titles(chapters) {
  return chapters.map((chapter) => {
    const match = chapter.content.match(/<h1.*?>(.*?)<\/h1>/);
    return match ? match[1] : `Chapter ${chapter.id}`;
  });
}

export default function BlogContent({ post, chapter, similarPosts }) {
  const hasChapters = post.chapters.length > 1;
  const isChapterPage = chapter !== undefined;

  const [isTocOpen, setIsTocOpen] = useState(false);

  const chapterTitles = extractH1Titles(post.chapters);

  const toggleToc = () => setIsTocOpen(!isTocOpen);

  return (
    <>
      <Head>
        <title>
          {post.data.title}
          {isChapterPage ? ` - Chapter ${chapter}` : ""} - Jesuloluwa
        </title>
        <meta
          name="description"
          content={post.data.description || post.content.substring(0, 160)}
        />
      </Head>

      <main className="container mx-auto px-4 sm:px-40 lg:px-72 py-8 mt-11 relative">
        {/* TOC Icon */}
        {hasChapters && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={toggleToc}
              className="bg-gray-950 dark:bg-gray-300 p-3 rounded-full dark:text-gray-950 text-white shadow-lg hover:bg-gray-700 dark:hover:bg-gray-500 transition"
            >
              <FaBook size={24} />
            </button>
          </div>
        )}

        {/* Table of Contents Modal */}
        <Modal
          isOpen={isTocOpen}
          onRequestClose={toggleToc}
          className="bg-gray-100 dark:bg-gray-800 border-2 rounded-3xl shadow-2xl max-w-lg w-11/12 h-[70vh] mx-auto mt-10 relative outline-none border-accent dark:border-accentDark"
          overlayClassName="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center"
          ariaHideApp={false} // Disable aria warning for this example
        >
          <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-600 px-6 py-4 bg-gray-100 dark:bg-gray-800 rounded-t-3xl">
            <h2 className="text-2xl font-bold text-gray-900 hover:text-gray-950 dark:text-white tracking-wide">
              Table of Contents
            </h2>
            <button
              onClick={toggleToc}
              className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-2xl transition-all"
            >
              <CloseIcon height="1.5rem" />
            </button>
          </div>

          <div className="overflow-y-auto px-6 py-4 space-y-4 h-[calc(70vh-72px)] no-scrollbar">
            <ul className="text-left">
              {post.chapters.map((ch, idx) => (
                <Link
                  key={ch.id}
                  href={`/blogs/${post.slug}/chapter/${ch.id}`}
                  className="transition duration-300"
                  onClick={toggleToc}
                >
                  <li className="group hover:bg-accent dark:text-gray-200 hover:text-light dark:hover:text-black dark:hover:bg-accentDark hover:rounded-md transition-all duration-300 ease-in-out px-4 py-2 text-lg">
                    {`${ch.id}: ${chapterTitles[idx]}`}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </Modal>

        <article className="text-gray-950 dark:text-white dark:bg-gray-950 p-6 rounded-lg">
          <header className="mb-8 text-center">
            <h1 className="font-semibold capitalize text-3xl md:text-4xl lg:text-5xl leading-tight">
              {post.data.title}
              {/* {isChapterPage ? ` - Chapter ${chapter}` : ""} */}
            </h1>
            <h3 className="text-gray-600 dark:text-gray-400 mt-2">
              {post.data.author || "Unknown Author"}
            </h3>
          </header>

          {/* Blog Image */}
          {post.data.image && (
            <div className="mb-8 relative w-full h-64 md:h-96 rounded-xl overflow-hidden group">
              <Image
                src={post.data.image}
                alt={`Image for ${post.data.title}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                placeholder="blur"
                blurDataURL="/placeholder.png"
              />
            </div>
          )}

          {/* Published Date and Tag */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            {/* Published Date */}
            <span className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
              {formatCustomDate(post.data.publishedAt)}
            </span>

            {/* Tag */}
            {post.data.tags && post.data.tags.length > 0 && (
              <Link
                href={`/categories/${slugify(post.data.tags[0])}`}
                className="inline-block uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm"
              >
                {post.data.tags[0]}
              </Link>
            )}
          </div>

          {/* Blog or Chapter Content */}
          <div className="prose dark:prose-dark max-w-none mb-12">
            <Markdown
              options={{
                overrides: {
                  p: {
                    component: ({ children }) => (
                      <p className={`leading-relaxed mb-3 ${inter.className}`}>
                        {children}
                      </p>
                    ),
                  },
                },
              }}
            >
              {isChapterPage
                ? post.chapters[chapter - 1].content
                : hasChapters
                ? post.chapters[0].content
                : post.content}
            </Markdown>
          </div>

          {/* Navigation Links for Chapters */}
          {hasChapters && (
            <div className="flex justify-between mb-8">
              {isChapterPage && chapter > 1 && (
                <Link
                  href={`/blogs/${post.slug}/chapter/${parseInt(chapter) - 1}`}
                  className="text-blue-500 hover:underline"
                >
                  Previous Chapter
                </Link>
              )}
              {isChapterPage && chapter < post.chapters.length && (
                <Link
                  href={`/blogs/${post.slug}/chapter/${parseInt(chapter) + 1}`}
                  className="ml-auto text-blue-500 hover:underline"
                >
                  Next Chapter
                </Link>
              )}
              {!isChapterPage && hasChapters && (
                <Link
                  href={`/blogs/${post.slug}/chapter/2`}
                  className="ml-auto text-blue-500 hover:underline"
                >
                  Next Chapter
                </Link>
              )}
            </div>
          )}

          {/* Similar Posts Section */}
          {similarPosts && similarPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-6">Similar Posts</h2>
              <RecentPosts posts={similarPosts} />
            </section>
          )}
        </article>
      </main>
    </>
  );
}
