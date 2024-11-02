// src/components/Footer.jsx

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import siteMetadata from "@/utils/siteMetadata";
import TwitterIcon from "@/components/Icons/TwitterIcon";
import LinkedInIcon from "@/components/Icons/LinkedInIcon";
import GitHubIcon from "@/components/Icons/GitHubIcon";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import CheckIcon from "@/components/Icons/CheckIcon";
import useDarkMode from "@/components/Hooks/useDarkMode";
import SearchOverlay from "@/components/SearchOverlay";
import SearchIcon from "../Icons/SearchIcon";
import SunIcon from "../Icons/SunIcon";
import MoonIcon from "../Icons/MoonIcon";
import Link from "next/link";

function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("EMAIL", data.email);

    // Replace this URL with your actual Mailchimp form action URL
    const actionUrl =
      "https://gmail.us8.list-manage.com/subscribe/post?u=4b3133edf8aff0e46c5a1a108&amp;id=84a151cc93&amp;f_id=005159e1f0";

    // Create a new form element to handle the submission
    const tempForm = document.createElement("form");
    tempForm.action = actionUrl;
    tempForm.method = "POST";
    tempForm.target = "_blank"; // Opens submission in a new tab

    // Add email field
    formData.forEach((value, key) => {
      const hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.name = key;
      hiddenInput.value = value;
      tempForm.appendChild(hiddenInput);
    });

    // Add bot field (hidden)
    const botField = document.createElement("input");
    botField.type = "text";
    botField.name = "b_4b3133edf8aff0e46c5a1a108_84a151cc93"; // Replace with your actual bot field name
    botField.tabIndex = "-1";
    botField.value = "";
    botField.style.position = "absolute";
    botField.style.left = "-5000px";
    tempForm.appendChild(botField);

    // Append the form to the document body and submit it
    document.body.appendChild(tempForm);
    tempForm.submit();
    document.body.removeChild(tempForm);

    // Provide feedback to the user
    setSubmissionStatus("success");
    setSubmissionMessage("Thank you for subscribing!");

    // Reset the form
    reset();
  };

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
      {/* Top Divider */}
      <div className="mt-32 border-t border-b border-solid border-gray-200 sm:mx-0 md:mx-[10%] dark:bg-gray-950" />

      {/* Footer Container */}
      <footer className="flex flex-col items-center text-gray-950 px-4 py-8 sm:px-6 lg:px-8 dark:bg-gray-950 dark:text-white">
        {/* Newsletter Section */}
        <div className="w-full max-w-md text-center">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-sm sm:text-base mb-6">
            Get notified when we publish something new
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative"
            noValidate
          >
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required.",
                maxLength: { value: 80, message: "Email is too long." },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200`}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby="email-error"
              disabled={submissionStatus === "success"}
            />
            <button
              type="submit"
              disabled={submissionStatus === "success"}
              className="absolute inset-y-0 right-0 px-3 bg-gray-700 hover:bg-yellow-400 rounded flex items-center justify-center text-white hover:text-gray-700 transition-colors duration-200"
              aria-label="Subscribe"
            >
              <ArrowIcon
                width="20"
                height="20"
                className={`transform ${
                  submissionStatus === "success"
                    ? "rotate-90"
                    : "hover:rotate-90"
                } transition-transform duration-200`}
              />
            </button>
          </form>
          {errors.email && (
            <p id="email-error" className="mt-2 text-red-600 text-sm">
              {errors.email.message}
            </p>
          )}
          {submissionStatus === "success" && (
            <div className="mt-2 flex items-center justify-center text-green-600 text-sm">
              <CheckIcon width="20" height="20" className="mr-2" />
              {submissionMessage}
            </div>
          )}
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mt-8">
          {/* Search Icon Button */}
          {!isSearchOpen && (
            <button
              onClick={openSearch}
              aria-label="Open Search"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
            >
              <SearchIcon />
            </button>
          )}
          <a
            href={siteMetadata.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <GitHubIcon />
          </a>
          <a
            href={siteMetadata.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <LinkedInIcon />
          </a>
          <a
            href={siteMetadata.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <TwitterIcon />
          </a>
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="animate-wobble ml-4"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* Additional Links */}
        <div className="flex space-x-4 mt-8 text-sm">
          <Link
            href="/privacy-policy"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-use"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Terms of Use
          </Link>
          <a
            href="#"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        {/* Bottom Divider and Copyright */}
        <div className="w-full border-t border-gray-200 mt-8 pt-4">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Jesuloluwa. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Search Overlay */}
      {isSearchOpen && <SearchOverlay closeSearch={closeSearch} />}
    </>
  );
}

export default Footer;
