// src/components/TogglePostsAndTags.js
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import slugify from "@/utils/slugify";
import { FaTags, FaList } from "react-icons/fa";

export default function TogglePostsAndTags({ posts }) {
  const [showPosts, setShowPosts] = useState(true);

  const handleToggle = () => {
    setShowPosts((prev) => !prev);
  };

  const tagCounts = useMemo(() => {
    const counts = {};
    posts.forEach((post) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach((tag) => {
          counts[tag] = (counts[tag] || 0) + 1;
        });
      }
    });
    return counts;
  }, [posts]);

  const uniqueTags = useMemo(() => Object.keys(tagCounts), [tagCounts]);

  return (
    <div className="max-w-3xl p-4">
      {/* Toggle Button */}
      <div className="flex sm:justify-start justify-center mb-6">
        <button
          onClick={handleToggle}
          className="flex items-center w-48 h-12 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-colors duration-300"
          aria-pressed={!showPosts}
          aria-label={showPosts ? "Show Tags" : "Show Posts"}
        >
          <div className="flex items-center justify-center w-10 h-full bg-gray-700 rounded-l-lg">
            {showPosts ? <FaList size={16} /> : <FaTags size={16} />}
          </div>
          <span className="flex-1 text-center text-sm font-semibold">
            {showPosts ? "Toggle Tags" : "Toggle Posts"}
          </span>
        </button>
      </div>

      {/* Content */}
      {showPosts ? (
        // Posts View
        <div className="relative max-h-[240px] overflow-y-auto scrollbar-hidden">
          {posts && posts.length > 0 ? (
            <div className="relative">
              <ul className="space-y-4">
                {posts.map((post) => (
                  <li key={post.slug} className="border-b pb-4">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="text-xl font-medium text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accentDark"
                    >
                      {post.title}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
                    </p>
                  </li>
                ))}
              </ul>
              {/* Bottom Gradient Overlay */}
              <div className="sticky bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-800 pointer-events-none"></div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No posts available.</p>
          )}
        </div>
      ) : (
        // Tags View
        <div className="relative max-h-[240px] overflow-y-auto scrollbar-hidden">
          {uniqueTags && uniqueTags.length > 0 ? (
            <div className="relative">
              <ul className="space-y-4">
                {uniqueTags.map((tag) => (
                  <li
                    key={tag}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <Link
                      href={`/categories/${slugify(tag)}`}
                      className="text-lg font-medium text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accentDark"
                    >
                      #{tag}
                    </Link>
                    <span className="text-sm text-gray-500">
                      {tagCounts[tag]}
                    </span>
                  </li>
                ))}
              </ul>
              {/* Bottom Gradient Overlay */}
              <div className="sticky bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-800 pointer-events-none"></div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No tags available.</p>
          )}
        </div>
      )}
    </div>
  );
}
