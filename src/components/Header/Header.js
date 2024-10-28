"use client";
import Logo from "./Logo";
import siteMetadata from "@/utils/siteMetadata";
import TwitterIcon from "@/components/Icons/TwitterIcon";
import LinkedInIcon from "@/components/Icons/LinkedInIcon";
import GitHubIcon from "@/components/Icons/GitHubIcon";
import SunIcon from "@/components/Icons/SunIcon"; // Create SunIcon component
import MoonIcon from "@/components/Icons/MoonIcon"; // Create MoonIcon component
import useDarkMode from "@/components/Hooks/useDarkMode";

const Header = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-10 py-4 flex items-center justify-between bg-white/80 dark:bg-gray-950/80 backdrop-filter backdrop-blur-md transition-colors duration-300">
      {/* Logo */}
      <Logo className="dark:bg-white" />

      {/* Navigation and Icons */}
      <div className="flex items-center space-x-4">
        {/* Social Media Links */}
        <div className="flex items-center space-x-4">
          <a
            href={siteMetadata.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
          >
            <GitHubIcon width="19" height="19" />
          </a>
          <a
            href={siteMetadata.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <LinkedInIcon width="19" height="19" />
          </a>
          <a
            href={siteMetadata.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <TwitterIcon width="19" height="19" />
          </a>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
          className="animate-wobble"
        >
          {isDarkMode ? (
            <SunIcon width={19} height={19} className="dark:text-white" />
          ) : (
            <MoonIcon
              width={19}
              height={19}
              className="text-gray-600 dark:text-gray-300"
            />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
