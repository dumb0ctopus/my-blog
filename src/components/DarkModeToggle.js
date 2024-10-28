// src/components/DarkModeToggle.jsx

"use client";

import React, { useEffect, useState } from "react";
import SunIcon from "@/components/Icons/SunIcon";
import MoonIcon from "@/components/Icons/MoonIcon";

const DarkModeToggle = () => {
  const [theme, setTheme] = useState("light");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);

    // Reset animation state after animation duration
    setTimeout(() => setIsAnimating(false), 300); // Match the transition duration
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className={`p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 ${
        isAnimating ? "transform rotate-180" : ""
      }`}
    >
      {theme === "light" ? (
        <SunIcon
          width="24"
          height="24"
          className="text-yellow-500 transition-colors duration-300"
        />
      ) : (
        <MoonIcon
          width="24"
          height="24"
          className="text-gray-300 transition-colors duration-300"
        />
      )}
    </button>
  );
};

export default DarkModeToggle;
