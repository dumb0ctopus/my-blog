// src/components/Icons/ArrowIcon.jsx

import React from "react";

// By: heroicons
// See: https://v0.app/icon/heroicons/arrow-long-right-20-solid
// Example: <ArrowIcon width="24px" height="24px" style={{color: "#000000"}} />

const ArrowIcon = ({
  height = "1em",
  fill = "currentColor",
  focusable = "false",
  ...props
}) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    height={height}
    focusable={focusable}
    {...props}
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10"
      clipRule="evenodd"
    />
  </svg>
);

export default ArrowIcon;
