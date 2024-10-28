// src/components/Icons/SpinnerIcon.jsx

import React from "react";

const SpinnerIcon = ({ width = "24", height = "24", className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`spinner-icon ${className}`}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="red"
    aria-hidden="true"
  >
    <path
      d="M12 4V1m0 22v-3m8-10h3M1 12h3m15.364-6.364l2.121 2.121M4.95 19.95l2.121-2.121m14.142 0l-2.121-2.121M4.95 4.05l2.121 2.121"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 12 12"
      to="360 12 12"
      dur="1s"
      repeatCount="indefinite"
    />
  </svg>
);

export default SpinnerIcon;
