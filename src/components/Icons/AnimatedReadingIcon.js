// src/components/Icons/AnimatedReadingIcon.jsx
"use client"

import React from "react";
import Lottie from "lottie-react";
import readingAnimation from "../../../public/Animations/reading.json"; // Path to your Lottie JSON file

const AnimatedReadingIcon = ({ width = 3000, height = 150, className = "" }) => {
  return (
    <div style={{ width, height }} className={className}>
      <Lottie animationData={readingAnimation} loop={true} />
    </div>
  );
};

export default AnimatedReadingIcon;
