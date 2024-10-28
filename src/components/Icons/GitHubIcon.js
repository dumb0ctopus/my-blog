import React from "react";

export default function GitHubIcon({
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
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transform transition-transform duration-300 hover:animate-wobble text-gray-950 dark:text-white"
    >
      <path
        d="M12 2c-5.523 0-10 4.477-10 10a10 10 0 0 0 6.838 9.464c.5.092.682-.216.682-.482v-1.739c-2.779.603-3.37-1.338-3.37-1.338a2.675 2.675 0 0 0-1.12-1.472c-.91-.622.069-.61.069-.61a2.138 2.138 0 0 1 1.556 1.048c.891 1.526 2.341 1.086 2.911.831a2.125 2.125 0 0 1 .63-1.348c-2.222-.253-4.556-1.11-4.556-4.942a3.862 3.862 0 0 1 1.031-2.678 3.6 3.6 0 0 1 .1-2.641s.84-.27 2.753 1.025a9.446 9.446 0 0 1 5 0c1.912-1.295 2.753-1.025 2.753-1.025a3.601 3.601 0 0 1 .1 2.641 3.864 3.864 0 0 1 1.031 2.678c0 3.84-2.337 4.685-4.566 4.936a2.136 2.136 0 0 1 .63 1.648v2.435c0 .27.18.578.688.48A10 10 0 0 0 22 12c0-5.523-4.477-10-10-10z"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.5"
      />
    </svg>
  );
}
