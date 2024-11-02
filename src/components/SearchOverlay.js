// components/SearchOverlay.js

"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import debounce from "lodash.debounce";
import CloseIcon from "./Icons/CloseIcon";
import TrashIcon from "./Icons/TrashIcon";
import { FaSpinner } from "react-icons/fa"; // Spinner icon for loading
import FaceGrinIcon from "./Icons/FaceGrinIcon"; // Ensure you have this icon
import EyeIcon from "./Icons/EyeIcon";

function SearchOverlay({ closeSearch }) {
  const [filteredData, setFilteredData] = useState([]);
  const [text, setText] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const overlayRef = useRef(null);

  // Fetch blog data from the API route
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        if (!data.error) {
          setBlogData(data);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, []);

  // Debounced filter function to improve performance
  const debouncedFilter = useMemo(
    () =>
      debounce((searchText) => {
        if (searchText === "") {
          setFilteredData([]);
          setLoading(false); // Ensure loading is false when search is cleared
          return;
        }

        const searchWords = searchText
          .toLowerCase()
          .normalize("NFKD")
          .split(" ")
          .filter((word) => word.trim() !== "");

        const newFilter = blogData.filter((value) => {
          const normalizedTitle = value.title.toLowerCase().normalize("NFKD");
          const normalizedContent = value.content
            .toLowerCase()
            .normalize("NFKD");
          // Check if all search words are in the title or content
          return searchWords.every(
            (word) =>
              normalizedTitle.includes(word) || normalizedContent.includes(word)
          );
        });

        setFilteredData(newFilter);
        setLoading(false); // Search is complete
      }, 300), // 300ms delay
    [blogData]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedFilter.cancel();
    };
  }, [debouncedFilter]);

  const handleFilter = (event) => {
    const searchInput = event.target.value;
    setText(searchInput);
    setLoading(true); // Start loading when user types
    debouncedFilter(searchInput);
  };

  // Clear search field
  const clearInput = () => {
    setFilteredData([]);
    setText("");
    setLoading(false); // Reset loading state
  };

  // Close search when clicking outside the search box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        closeSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeSearch]);

  // Close search on pressing 'Esc' key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeSearch();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [closeSearch]);

  return (
    <div className="fixed inset-0 z-50 sm:mt-20 mt-20 flex items-start justify-center lg:justify-end bg-black bg-opacity-50">
      {/* Search Box */}
      <div
        ref={overlayRef}
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-md shadow-lg p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={closeSearch}
          aria-label="Close Search"
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
        >
          <CloseIcon />
        </button>

        {/* Search Input */}
        <div className="flex items-center border-b-4 border-blue-700 mr-11 overflow-hidden">
          <input
            type="text"
            placeholder="Search through all blog posts..."
            value={text}
            onChange={handleFilter}
            autoFocus
            className="flex-1 px-4 py-2 text-black dark:text-white bg-transparent focus:outline-none"
          />
          {text && (
            <button
              onClick={clearInput}
              aria-label="Clear Search"
              className="p-2 text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
            >
              <TrashIcon />
            </button>
          )}
        </div>

        {/* Prompt Message When No Search is Made */}
        {!text && (
          <div className="mt-6 text-xl flex items-center justify-center text-center text-gray-950 dark:text-white">
            <span>
              What are you looking for?
              <EyeIcon className="inline-block ml-1" />
            </span>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && text && (
          <div className="mt-6 flex items-center justify-center space-x-2 text-center text-gray-500 dark:text-gray-400">
            <FaSpinner className="animate-spin" />
            <span>Searching...</span>
          </div>
        )}

        {/* Message When No Results are Found */}
        {!loading && text && filteredData.length === 0 && (
          <div className="mt-6 flex items-center justify-center space-x-2 text-center text-gray-950 dark:text-white text-xl">
            <span>
              I will think about writing something like that in the future, but
              I don&#39;t have it yet!
              <FaceGrinIcon className="inline-block ml-1" />
            </span>
          </div>
        )}

        {/* Search Results */}
        {filteredData.length > 0 && (
          <div className="mt-4 h-full overflow-y-auto hide-scrollbar">
            {filteredData.slice(0, 11).map((value, key) => (
              <div
                key={key}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <a
                  href={value.link}
                  rel="noopener noreferrer"
                  className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="text-sm mt-1">{value.description}</p>
                  <span className="text-xs mt-1 block text-gray-500 dark:text-gray-400">
                    {new Date(value.publishedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchOverlay;
