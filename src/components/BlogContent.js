// components/BlogContent.js

"use client";

import React, { useState, useEffect } from "react";
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
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { FaXTwitter } from "react-icons/fa6"; // Import the new Twitter (X) icon
import { FaTwitter } from "react-icons/fa"; // Fallback to the old Twitter icon if needed

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
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      setCurrentUrl(url);
    }
  }, []);

  const hasChapters = post.chapters.length > 1;
  const isChapterPage = chapter !== undefined;

  const [isTocOpen, setIsTocOpen] = useState(false);

  const chapterTitles = extractH1Titles(post.chapters);

  const toggleToc = () => setIsTocOpen(!isTocOpen);

  const currentChapterId = chapter ? parseInt(chapter) : 1;

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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-11 relative">
        {/* TOC Icon */}
        {hasChapters && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={toggleToc}
              className="bg-gray-950 dark:bg-gray-300 p-3 rounded-full dark:text-gray-950 text-white shadow-lg hover:bg-gray-700 dark:hover:bg-gray-500 transition"
              aria-label="Toggle Table of Contents"
            >
              <FaBook size={24} />
            </button>
          </div>
        )}

        {/* Table of Contents Modal */}
        <Modal
          isOpen={isTocOpen}
          onRequestClose={toggleToc}
          className="bg-gray-100 dark:bg-gray-950 border-2 rounded-3xl shadow-2xl max-w-lg w-11/12 h-[70vh] mx-auto mt-10 relative outline-none border-accent dark:border-accentDark"
          overlayClassName="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center"
          ariaHideApp={false}
        >
          <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-600 px-6 py-4 bg-gray-100 dark:bg-gray-950 rounded-t-3xl">
            <h2 className="text-2xl font-bold text-gray-900 hover:text-gray-950 dark:text-white tracking-wide">
              Table of Contents
            </h2>
            <button
              onClick={toggleToc}
              className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-2xl transition-all"
              aria-label="Close Table of Contents"
            >
              <CloseIcon height="1.5rem" />
            </button>
          </div>

          <div className="overflow-y-auto px-6 py-4 space-y-7 h-[calc(70vh-72px)] no-scrollbar">
            <ul className="text-left">
              {post.chapters.map((ch, idx) => {
                const isCurrentChapter = parseInt(ch.id) === currentChapterId;
                return (
                  <Link
                    key={ch.id}
                    href={`/blogs/${post.slug}/chapter/${ch.id}`}
                    className="transition duration-300"
                    onClick={toggleToc}
                    aria-current={isCurrentChapter ? "page" : undefined}
                  >
                    <li
                      className={`group transition-all duration-300 ease-in-out px-4 py-2 text-lg my-1 ${
                        isCurrentChapter
                          ? "bg-accent text-light rounded-md dark:bg-accentDark dark:text-black"
                          : "dark:text-gray-200 hover:bg-accent hover:text-light hover:rounded-md dark:hover:bg-accentDark dark:hover:text-black"
                      }`}
                    >
                      {`${chapterTitles[idx]}`}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </Modal>

        <article className="text-gray-950 dark:text-white dark:bg-gray-950 p-6 rounded-lg">
          <header className="mb-8 text-center">
            <h1 className="font-semibold capitalize text-lg md:text-2xl lg:text-3xl leading-tight">
              {post.data.title}
            </h1>
            <h3 className="text-gray-600 dark:text-gray-400 mt-2">
              {post.data.author || "Unknown Author"}
            </h3>
          </header>

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

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <span className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
              {formatCustomDate(post.data.publishedAt)}
            </span>

            {post.data.tags && post.data.tags.length > 0 && (
              <Link
                href={`/categories/${slugify(post.data.tags[0])}`}
                className="inline-block uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm"
              >
                {post.data.tags[0]}
              </Link>
            )}
          </div>

          <div className="prose dark:prose-dark max-w-none mb-12">
            <Markdown
              options={{
                overrides: {
                  p: {
                    component: ({ children }) => (
                      <p
                        className={`leading-relaxed mb-3 text-sm md:text-lg ${inter.className}`}
                      >
                        {children}
                      </p>
                    ),
                  },
                },
              }}
            >
              {isChapterPage
                ? post.chapters[currentChapterId - 1].content
                : hasChapters
                ? post.chapters[0].content
                : post.content}
            </Markdown>
          </div>

          {/* Navigation Between Chapters */}
          {hasChapters && (
            <div className="flex justify-between items-center mb-8">
              <span className="text-gray-700 dark:text-gray-300">
                Chapter {currentChapterId} of {post.chapters.length}
              </span>
              <div className="flex space-x-4">
                {isChapterPage && currentChapterId > 1 && (
                  <Link
                    href={`/blogs/${post.slug}/chapter/${currentChapterId - 1}`}
                    className="text-blue-500 hover:underline"
                  >
                    Previous
                  </Link>
                )}
                {isChapterPage && currentChapterId < post.chapters.length && (
                  <Link
                    href={`/blogs/${post.slug}/chapter/${currentChapterId + 1}`}
                    className="text-blue-500 hover:underline"
                  >
                    Next
                  </Link>
                )}
                {!isChapterPage && hasChapters && (
                  <Link
                    href={`/blogs/${post.slug}/chapter/2`}
                    className="text-blue-500 hover:underline"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Social Sharing Buttons */}
          {currentUrl && (
            <div className="flex space-x-4 mt-8">
              <FacebookShareButton url={currentUrl} quote={post.data.title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <WhatsappShareButton url={currentUrl} title={post.data.title}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <TwitterShareButton url={currentUrl} title={post.data.title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <LinkedinShareButton
                url={currentUrl}
                summary={post.data.description}
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
          )}

          {/* Similar Posts Section */}
          {similarPosts && similarPosts.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Similar Posts</h2>
              <RecentPosts posts={similarPosts} />
            </section>
          )}
        </article>
      </main>
    </>
  );
}
