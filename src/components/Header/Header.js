// components/Header.js

"use client";

import { useState } from "react";
import Logo from "./Logo";
import siteMetadata from "@/utils/siteMetadata";
import TwitterIcon from "@/components/Icons/TwitterIcon";
import LinkedInIcon from "@/components/Icons/LinkedInIcon";
import GitHubIcon from "@/components/Icons/GitHubIcon";
import SunIcon from "@/components/Icons/SunIcon";
import MoonIcon from "@/components/Icons/MoonIcon";
import useDarkMode from "@/components/Hooks/useDarkMode";
import SearchOverlay from "@/components/SearchOverlay";
import SearchIcon from "../Icons/SearchIcon";

const Header = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Function to open the search overlay
  const openSearch = () => {
    setIsSearchOpen(true);
  };

  // Function to close the search overlay
  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[9999] px-5 sm:px-14 md:px-32 py-4 flex items-center justify-between bg-white/80 dark:bg-gray-950/80 backdrop-filter backdrop-blur-md transition-colors duration-300">
        {/* Logo */}
        <Logo className="dark:bg-white" />

        {/* Navigation and Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Icon Button */}
          {!isSearchOpen && (
            <button
              onClick={openSearch}
              aria-label="Open Search"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
            >
              <SearchIcon size={19} />
            </button>
          )}

          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            <a
              href={siteMetadata.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
            >
              <GitHubIcon />
            </a>
            <a
              href={siteMetadata.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <LinkedInIcon />
            </a>
            <a
              href={siteMetadata.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <TwitterIcon />
            </a>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="animate-wobble ml-4"
          >
            {isDarkMode ? (
              <SunIcon />
            ) : (
              <MoonIcon />
            )}
          </button>
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && <SearchOverlay closeSearch={closeSearch} />}
    </>
  );
};

export default Header;
