// src/components/Footer.jsx

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import siteMetadata from "@/utils/siteMetadata";
import TwitterIcon from "@/components/Icons/TwitterIcon";
import LinkedInIcon from "@/components/Icons/LinkedInIcon";
import GitHubIcon from "@/components/Icons/GitHubIcon";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import SpinnerIcon from "@/components/Icons/SpinnerIcon";
import CheckIcon from "@/components/Icons/CheckIcon";

function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'success', 'error'
  const [submissionMessage, setSubmissionMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmissionStatus("success");
        setSubmissionMessage(result.message);
        reset(); // Reset the form upon successful submission
      } else {
        setSubmissionStatus("error");
        setSubmissionMessage(result.message || "Subscription failed.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmissionStatus("error");
      setSubmissionMessage("An unexpected error occurred. Please try again.");
    }
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
            Stay updated with the latest news and articles.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="relative">
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
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute inset-y-0 right-0 px-3 bg-gray-700 hover:bg-yellow-400 rounded flex items-center justify-center text-white hover:text-gray-700 transition-colors duration-200"
              aria-label="Subscribe"
            >
              {isSubmitting ? (
                <SpinnerIcon width="20" height="20" className="animate-spin" />
              ) : (
                <ArrowIcon
                  width="20"
                  height="20"
                  className="transform hover:rotate-90 animate-pulse"
                />
              )}
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
          {submissionStatus === "error" && (
            <div className="mt-2 flex items-center justify-center text-red-600 text-sm">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  clipRule="evenodd"
                />
              </svg>
              {submissionMessage}
            </div>
          )}
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mt-8">
          <a
            href={siteMetadata.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <GitHubIcon width="24" height="24" />
          </a>
          <a
            href={siteMetadata.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <LinkedInIcon width="24" height="24" />
          </a>
          <a
            href={siteMetadata.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <TwitterIcon width="24" height="24" />
          </a>
        </div>

        {/* Additional Links */}
        <div className="flex space-x-4 mt-8 text-sm">
          <a
            href="/privacy-policy"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a
            href="/contact"
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
    </>
  );
}

export default Footer;
