// components/SearchOverlay.js

"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import debounce from "lodash.debounce";
import CloseIcon from "./Icons/CloseIcon";
import TrashIcon from "./Icons/TrashIcon";
import { FaSpinner } from "react-icons/fa"; // Spinner icon for loading
import FaceGrinIcon from "./Icons/FaceGrinIcon"; // Ensure you have this icon
import EyeIcon from "./Icons/EyeIcon";
import Highlighter from "react-highlight-words"; // For highlighting matched words
import stringSimilarity from "string-similarity"; // Import string-similarity library

function SearchOverlay({ closeSearch }) {
  const [filteredData, setFilteredData] = useState([]);
  const [text, setText] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const overlayRef = useRef(null);

  // List of stop words to exclude from highlighting
  const stopWords = [
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "but",
    "by",
    "for",
    "if",
    "in",
    "into",
    "is",
    "it",
    "no",
    "not",
    "of",
    "on",
    "or",
    "such",
    "that",
    "the",
    "their",
    "then",
    "there",
    "these",
    "they",
    "this",
    "to",
    "was",
    "will",
    "with",
    "i",
    // Add more stop words as needed
  ];

  // Fetch blog data from the API route
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        if (!data.error && Array.isArray(data)) {
          setBlogData(data);
        } else {
          console.error("Error fetching blog data:", data.error);
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
        const trimmedSearchText = searchText.trim();

        if (trimmedSearchText === "") {
          setFilteredData([]);
          setLoading(false);
          return;
        }

        const lowerSearchText = trimmedSearchText.toLowerCase();
        const searchWords = lowerSearchText.split(/\s+/);

        let exactMatches = [];
        let partialMatches = [];

        const searchResults = blogData
          .map((item) => {
            const title = item.title;
            const content = item.content;

            const lowerTitle = title.toLowerCase();
            const lowerContent = content.toLowerCase();

            // Check for exact match in title
            const titleExactMatch = lowerTitle === lowerSearchText;

            // Check for exact match in content
            const contentExactMatch = lowerContent.includes(lowerSearchText);

            if (titleExactMatch || contentExactMatch) {
              // Exact match found
              exactMatches.push({
                item,
                isExactMatch: true,
              });
              return null; // Exclude from further processing
            }

            // Generate n-grams of varying sizes
            const contentTokens = content.split(/\s+/);
            const maxNgramSize = Math.min(3, searchWords.length); // Limit n-gram size
            let allNgrams = [];

            for (let n = maxNgramSize; n >= 1; n--) {
              for (let i = 0; i <= contentTokens.length - n; i++) {
                const ngram = contentTokens.slice(i, i + n).join(" ");
                allNgrams.push(ngram.toLowerCase());
              }
            }

            // Calculate similarity scores
            const similarities = allNgrams.map((ngram) =>
              stringSimilarity.compareTwoStrings(lowerSearchText, ngram)
            );

            const maxSimilarity = Math.max(...similarities, 0);

            // Compute overall relevance score
            const titleSimilarity = stringSimilarity.compareTwoStrings(
              lowerSearchText,
              lowerTitle
            );

            const relevanceScore = 0.6 * titleSimilarity + 0.4 * maxSimilarity;

            if (relevanceScore >= 0.3) {
              return {
                item,
                relevanceScore,
              };
            } else {
              return null;
            }
          })
          .filter((result) => result !== null);

        if (exactMatches.length > 0) {
          // If there are exact matches, only show them
          setFilteredData(
            exactMatches.map((match) => ({
              item: match.item,
              relevanceScore: 1, // Highest possible score
            }))
          );
        } else if (searchResults.length > 0) {
          // Sort results by relevance score
          const sortedResults = searchResults.sort(
            (a, b) => b.relevanceScore - a.relevanceScore
          );
          setFilteredData(sortedResults);
        } else {
          // No matches found
          setFilteredData([]);
        }

        setLoading(false);
      }, 300),
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
        <div className="flex items-center border-b-4 border-blue-700 mr-11 overflow-hidden relative">
          <input
            type="text"
            placeholder="Search through all blog posts..."
            value={text}
            onChange={handleFilter}
            autoFocus
            className="flex-1 px-4 py-2 text-black dark:text-white bg-transparent focus:outline-none"
            aria-label="Search"
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
        {!text.trim() && (
          <div className="mt-6 text-xl flex items-center justify-center text-center text-gray-950 dark:text-white">
            <span>
              What are you looking for?
              <EyeIcon className="inline-block ml-1" />
            </span>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && text.trim() && (
          <div className="mt-6 flex items-center justify-center space-x-2 text-center text-gray-500 dark:text-gray-400">
            <FaSpinner className="animate-spin" />
            <span>Searching...</span>
          </div>
        )}

        {/* Message When No Results are Found */}
        {!loading && text.trim() && filteredData.length === 0 && (
          <div className="mt-6 flex items-center justify-center space-x-2 text-center text-gray-950 dark:text-white text-xl">
            <span>
              I will think about writing something like that in the future, but
              I don&#39;t have it yet!
              <FaceGrinIcon className="inline-block ml-1" />
            </span>
          </div>
        )}

        {/* Search Results */}
        {filteredData.length > 0 && !loading && (
          <div className="mt-4 max-h-[80vh] overflow-y-scroll scrollbar-hidden">
            {filteredData.slice(0, 11).map((result, key) => {
              const item = result.item;

              // Generate search words for highlighting, excluding stop words
              let searchWords = text
                .trim()
                .split(/\s+/)
                .filter((word) => !stopWords.includes(word.toLowerCase()));

              // Ensure at least one word is highlighted
              if (searchWords.length === 0) {
                searchWords = [text.trim()];
              }

              // Get snippet from content
              let snippet = "";
              const lowerContent = item.content.toLowerCase();
              const lowerSearchText = text.trim().toLowerCase();

              let matchIndex = lowerContent.indexOf(lowerSearchText);

              if (matchIndex === -1) {
                // Find the best matching n-gram
                const contentTokens = item.content.split(/\s+/);
                const maxNgramSize = Math.min(3, searchWords.length);

                let maxSimilarity = 0;
                let bestMatchIndex = -1;

                for (let n = maxNgramSize; n >= 1; n--) {
                  for (let i = 0; i <= contentTokens.length - n; i++) {
                    const ngram = contentTokens.slice(i, i + n).join(" ");
                    const ngramLower = ngram.toLowerCase();
                    const similarity = stringSimilarity.compareTwoStrings(
                      lowerSearchText,
                      ngramLower
                    );
                    if (similarity > maxSimilarity) {
                      maxSimilarity = similarity;
                      bestMatchIndex = lowerContent.indexOf(ngramLower);
                    }
                  }
                }

                matchIndex = bestMatchIndex;
              }

              if (matchIndex !== -1) {
                const start = matchIndex;
                const end = matchIndex + lowerSearchText.length;

                const snippetSize = 200;
                const snippetStart = Math.max(0, start - snippetSize / 2);
                const snippetEnd = Math.min(
                  item.content.length,
                  end + snippetSize / 2
                );
                snippet = item.content.substring(snippetStart, snippetEnd);

                if (snippetStart > 0) {
                  snippet = "..." + snippet;
                }
                if (snippetEnd < item.content.length) {
                  snippet = snippet + "...";
                }
              } else {
                snippet = item.content.substring(0, 200) + "...";
              }

              return (
                <div
                  key={key}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <a
                    href={item.link}
                    rel="noopener noreferrer"
                    className="block p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold">
                      <Highlighter
                        highlightClassName="highlight"
                        searchWords={searchWords}
                        autoEscape={true}
                        textToHighlight={item.title}
                      />
                    </h3>
                    <p className="text-sm mt-1 line-clamp-2">
                      <Highlighter
                        highlightClassName="highlight"
                        searchWords={searchWords}
                        autoEscape={true}
                        textToHighlight={snippet}
                      />
                    </p>
                    <span className="text-xs mt-1 block text-gray-500 dark:text-gray-400">
                      {new Date(item.publishedAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchOverlay;
