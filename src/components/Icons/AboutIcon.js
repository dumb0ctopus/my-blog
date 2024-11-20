// components/IconHelpInfo.js

import * as React from "react";

function AboutIcon(props) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 36 36"
      height="1.5em"
      width="1.5em"
      {...props}
      className="transform transition-transform duration-300 hover:animate-wobble text-gray-950 dark:text-white"
    >
      {/* Background Carrier */}
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      {/* Tracer Carrier */}
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      {/* Icon Carrier */}
      <g id="SVGRepo_iconCarrier">
        <title>About</title>
        {/* Circle with Pulse Animation */}
        <circle
          cx="20.75"
          cy="6"
          r="4"
          className="clr-i-solid clr-i-solid-path-1 animate-pulse"
        ></circle>
        {/* Main Path */}
        <path
          d="M24.84,26.23a1,1,0,0,0-1.4.29,16.6,16.6,0,0,1-3.51,3.77c-.33.25-1.56,1.2-2.08,1-.36-.11-.15-.82-.08-1.12l.53-1.57c.22-.64,4.05-12,4.47-13.3.62-1.9.35-3.77-2.48-3.32-.77.08-8.58,1.09-8.72,1.1a1,1,0,0,0,.13,2s3-.39,3.33-.42a.88.88,0,0,1,.85.44,2.47,2.47,0,0,1-.07,1.71c-.26,1-4.37,12.58-4.5,13.25a2.78,2.78,0,0,0,1.18,3,5,5,0,0,0,3.08.83h0a8.53,8.53,0,0,0,3.09-.62c2.49-1,5.09-3.66,6.46-5.75A1,1,0,0,0,24.84,26.23Z"
          className="clr-i-solid clr-i-solid-path-2"
        ></path>
        {/* Transparent Rectangle */}
        <rect x="0" y="0" width="36" height="36" fillOpacity="0"></rect>
      </g>
    </svg>
  );
}

export default AboutIcon;
