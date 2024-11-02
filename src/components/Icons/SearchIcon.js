import * as React from "react";

function SearchIcon(props) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1.7em"
      width="2em"
      {...props}
      className="transform transition-transform duration-300 hover:animate-wobble text-gray-950 dark:text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M17 10 A7 7 0 0 1 10 17 A7 7 0 0 1 3 10 A7 7 0 0 1 17 10 z" />
      <path d="M21 21l-6-6" />
    </svg>
  );
}

export default SearchIcon;
