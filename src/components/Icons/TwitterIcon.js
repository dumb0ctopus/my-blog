import React from "react";

export default function TwitterIcon({
  width = "24",
  height = "24",
  color = "currentColor",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-2 -2 28 28" // Adjusted viewBox to prevent clipping
      width={width}
      height={height}
      fill="none"
      className="transform transition-transform duration-300 hover:animate-wobble"
    >
      <path
        d="M23 2.999a10.009 10.009 0 0 1-2.828.775A4.932 4.932 0 0 0 22.338.356a9.94 9.94 0 0 1-3.127 1.193 4.916 4.916 0 0 0-8.374 4.482A13.94 13.94 0 0 1 1.671.894a4.914 4.914 0 0 0 1.523 6.555A4.897 4.897 0 0 1 .96 6.571v.062a4.916 4.916 0 0 0 3.946 4.827 4.902 4.902 0 0 1-2.21.084 4.92 4.92 0 0 0 4.587 3.417A9.874 9.874 0 0 1 0 19.54a13.936 13.936 0 0 0 7.548 2.213c9.058 0 14.01-7.496 14.01-13.985 0-.213-.004-.426-.014-.636A9.936 9.936 0 0 0 23 2.999z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-colors duration-300 text-gray-950 dark:text-white"
      />
    </svg>
  );
}
