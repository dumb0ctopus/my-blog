// src/hooks/useDarkMode.js

import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On mount, check for user preference in localStorage or system settings
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
      setIsDarkMode(savedMode === "dark");
      if (savedMode === "dark") {
        document.documentElement.classList.add("dark");
      }
    } else {
      // If no preference, use system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Toggle dark mode and persist preference
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return [isDarkMode, toggleDarkMode];
};

export default useDarkMode;
