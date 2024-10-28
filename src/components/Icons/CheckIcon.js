// src/components/Icons/CheckIcon.jsx

import React from "react";

const CheckIcon = ({ width = "24", height = "24", className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`check-icon ${className}`}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M20.285 6.708a1 1 0 00-1.414-1.414L9 14.16l-3.871-3.871a1 1 0 00-1.414 1.414l4.578 4.578a1 1 0 001.414 0l10.578-10.578z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

export default CheckIcon;
