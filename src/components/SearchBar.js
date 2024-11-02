// // components/SearchBar.js

// "use client";

// import { useState, useEffect, useMemo } from "react";
// import { FaTimes } from "react-icons/fa";
// import debounce from "lodash.debounce";

// function SearchBar({ placeholder, closeSearch }) {
//   const [filteredData, setFilteredData] = useState([]);
//   const [text, setText] = useState("");
//   const [blogData, setBlogData] = useState([]);

//   // Fetch blog data from the API route
//   useEffect(() => {
//     const fetchBlogData = async () => {
//       try {
//         const response = await fetch("/api/blogs");
//         const data = await response.json();
//         if (!data.error) {
//           setBlogData(data);
//         } else {
//           console.error(data.error);
//         }
//       } catch (error) {
//         console.error("Error fetching blog data:", error);
//       }
//     };

//     fetchBlogData();
//   }, []);

//   // Debounced filter function to improve performance
//   const debouncedFilter = useMemo(
//     () =>
//       debounce((searchText) => {
//         if (searchText === "") {
//           setFilteredData([]);
//           return;
//         }

//         const searchWords = searchText
//           .toLowerCase()
//           .normalize("NFKD")
//           .split(" ")
//           .filter((word) => word.trim() !== "");

//         const newFilter = blogData.filter((value) => {
//           const normalizedTitle = value.title.toLowerCase().normalize("NFKD");
//           return searchWords.every((word) => normalizedTitle.includes(word));
//         });

//         setFilteredData(newFilter);
//       }, 300), // 300ms delay
//     [blogData]
//   );

//   const handleFilter = (event) => {
//     const searchInput = event.target.value;
//     setText(searchInput);
//     debouncedFilter(searchInput);
//   };

//   // Clear search field
//   const clearInput = () => {
//     setFilteredData([]);
//     setText("");
//     closeSearch(); // Optionally close the search after clearing
//   };

//   // Cleanup debounce on unmount
//   useEffect(() => {
//     return () => {
//       debouncedFilter.cancel();
//     };
//   }, [debouncedFilter]);

//   return (
//     <div className="mt-20 md:mt-16 px-5 sm:px-14 md:px-32">
//       {" "}
//       {/* Adjust top margin to account for fixed header */}
//       {/* Search Input Container */}
//       <div className="flex items-center w-full bg-white dark:bg-gray-900 p-4 rounded-md shadow-md">
//         {/* Search Input */}
//         <input
//           type="text"
//           placeholder={placeholder}
//           value={text}
//           onChange={handleFilter}
//           autoFocus
//           className="flex-1 px-4 py-2 bg-yellow-50 text-black rounded-l-md focus:outline-none"
//         />
//         {/* Clear Button */}
//         <button
//           className="p-2 bg-gray-900 rounded-r-md hover:cursor-pointer flex items-center justify-center"
//           onClick={clearInput}
//           aria-label="Clear Search"
//         >
//           <FaTimes className="text-white" />
//         </button>
//       </div>
//       {/* Search Results */}
//       {filteredData.length !== 0 && (
//         <div
//           className="mt-4 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-y-auto max-h-96"
//           style={{
//             scrollbarWidth: "none", // Hide scrollbar in Firefox
//           }}
//         >
//           {filteredData.slice(0, 5).map((value, key) => (
//             <div
//               key={key}
//               className="border-b border-gray-200 dark:border-gray-700"
//             >
//               <a
//                 href={value.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
//                 onClick={closeSearch} // Optionally close search on link click
//               >
//                 <h3 className="text-lg font-semibold">{value.title}</h3>
//                 <p className="text-sm mt-1">{value.description}</p>
//                 <span className="text-xs mt-1 block text-gray-500 dark:text-gray-400">
//                   {new Date(value.publishedAt).toLocaleDateString(undefined, {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   })}
//                 </span>
//               </a>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SearchBar;
