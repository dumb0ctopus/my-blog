import React from "react";

export default function LinkedInIcon({
  width = "24",
  height = "24",
  color = "currentColor",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      className="transform transition-transform duration-300 hover:animate-wobble"
    >
      <path
        d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-6a6 6 0 0 1 6-6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-colors duration-300 text-gray-950 dark:text-white"
      />
      <rect
        x="2"
        y="9"
        width="4"
        height="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-colors duration-300 text-gray-950 dark:text-white"
      />
      <circle
        cx="4"
        cy="4"
        r="2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-colors duration-300 text-gray-950 dark:text-white"
      />
    </svg>
  );
}
