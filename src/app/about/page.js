"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
  FaTwitter,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import img from "../../../public/images/profileImg.png";
import siteMetadata from "@/utils/siteMetadata";

const myBlog = "/images/";

const About = () => {
  const [activeSection, setActiveSection] = useState("About");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll to toggle shadow in header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Framer Motion variants for animations
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderSection = () => {
    switch (activeSection) {
      case "About":
        return (
          <motion.main
            key="About"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center text-center md:text-left space-y-8 md:space-y-0 md:space-x-16 py-16 md:py-32 dark:bg-gray-950 dark:text-white"
            aria-labelledby="about-heading"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full md:w-1/2 max-w-md"
            >
              <Image
                src={img} // Profile image imported statically
                alt="Jesuloluwa's Profile Picture"
                width={400}
                height={400}
                className="rounded-lg shadow-xl transform hover:rotate-1 transition-all duration-500"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="md:w-1/2 max-w-2xl px-6"
            >
              <h1
                id="about-heading"
                className="text-6xl font-extrabold mb-6 text-gray-900 leading-tight dark:bg-gray-950 dark:text-white"
              >
                Hello, I&#39;m <span className="text-blue-600">Jesuloluwa</span>
              </h1>
              <p className="text-2xl sm:text-lg text-gray-700 mb-6 leading-relaxed dark:bg-gray-950 dark:text-white">
                I'm a developer dedicated to crafting creative, dynamic web
                experiences that are both intuitive and memorable. My passion
                lies in building scalable solutions that address real-world
                challenges. Beyond coding, I love sharing knowledge through
                writing, which led me to create this blog. I also enjoy
                contributing to open source, bringing ideas to life for the
                community.
              </p>
            </motion.div>
          </motion.main>
        );

      case "Projects":
        return (
          <motion.main
            key="Projects"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.8 }}
            className="overflow-hidden py-20 dark:bg-gray-950 dark:text-white"
            aria-labelledby="projects-heading"
          >
            <h2
              id="projects-heading"
              className="text-5xl font-bold text-center text-gray-900 mb-12 dark:bg-gray-950 dark:text-white"
            >
              Projects
            </h2>
            <div className="flex space-x-8 overflow-x-scroll scrollbar-hidden p-6 snap-x snap-mandatory dark:bg-gray-950 dark:text-white">
              {[
                {
                  name: "My Blog Site",
                  description: "A creative way to write",
                  url: "https://github.com/dumb0ctopus/my-blog",
                  image: `${myBlog}project1.png`,
                },
                {
                  name: "A Search Tool",
                  description: "I'm using a tweaked version for my blog.",
                  url: "https://github.com/dumb0ctopus/searchTool",
                  image: `${myBlog}project2.png`,
                },
                {
                  name: "Epub Reader",
                  description: "In progress. I'll continue to update the repo.",
                  url: "https://github.com/dumb0ctopus/epubReader",
                  image: `${myBlog}project3.png`,
                },
              ].map((project, index) => (
                <motion.article
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg shadow-xl snap-center p-6 min-w-[300px] transform transition-transform duration-300 hover:scale-105 dark:bg-gray-600 dark:text-white"
                  aria-labelledby={`project-${index}-title`}
                >
                  <Image
                    src={project.image} // Correctly referencing images in the public/images directory
                    alt={`${project.name} Screenshot`}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3
                    id={`project-${index}-title`}
                    className="text-2xl font-bold text-gray-800 mb-2 dark:text-white"
                  >
                    {project.name}
                  </h3>
                  <p className="text-lg text-gray-600 mb-4 dark:text-white">
                    {project.description}
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-white"
                  >
                    View on GitHub
                  </a>
                </motion.article>
              ))}
            </div>
          </motion.main>
        );

      case "Contact":
        return (
          <motion.main
            key="Contact"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center py-20 space-y-8 dark:bg-gray-950 dark:text-white"
            aria-labelledby="contact-heading"
          >
            <h2
              id="contact-heading"
              className="text-5xl font-bold text-gray-900 dark:text-white"
            >
              Let&#39;s Connect
            </h2>
            <p className="text-lg text-gray-700 max-w-lg mx-auto dark:text-white">
              Whether you&#39;re interested in working together or just want to
              say hi, my inbox is always open. Reach out, and let’s create
              something amazing together.
            </p>
            <div className="flex space-x-8">
              <a
                href={`mailto:${siteMetadata.email}`}
                className="text-gray-700 hover:text-blue-600 dark:text-white transition-colors duration-300"
                aria-label="Email"
              >
                <FaEnvelope size={50} />
              </a>
              <a
                href={siteMetadata.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 dark:text-white transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={50} />
              </a>
              <a
                href={siteMetadata.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 dark:text-white transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={50} />
              </a>
              <a
                href={siteMetadata.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 dark:text-white transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={50} />
              </a>
            </div>
          </motion.main>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Head Component for SEO */}
      <Head>
        <title>
          Jesuloluwa's Portfolio | Developer, Blogger, Open Source Contributor
        </title>
        <meta
          name="description"
          content="Welcome to Jesuloluwa's portfolio. Discover my projects, read my blog, and get in touch to collaborate on innovative web solutions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Jesuloluwa's Portfolio" />
        <meta
          property="og:description"
          content="Developer, Blogger, and Open Source Contributor. Explore my projects and blog."
        />
        <meta property="og:image" content="/images/og-image.png" />
        <meta property="og:url" content="https://yourdomain.com/about" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jesuloluwa's Portfolio" />
        <meta
          name="twitter:description"
          content="Developer, Blogger, and Open Source Contributor. Explore my projects and blog."
        />
        <meta name="twitter:image" content="/images/twitter-image.png" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jesuloluwa",
              jobTitle: "Web Developer",
              url: "https://yourdomain.com/about",
              sameAs: [
                siteMetadata.github,
                siteMetadata.linkedin,
                siteMetadata.twitter,
              ],
              image: "/images/profileImg.png",
              description:
                "I'm a developer dedicated to crafting creative, dynamic web experiences. Explore my projects and blog.",
            }),
          }}
        />
      </Head>

      <div className="bg-white transition-colors duration-500 dark:bg-gray-950 dark:text-white">
        {/* Sticky Header */}
        <header
          className={`fixed hidden md:flex top-32 left-0 right-0 z-50 transition-transform duration-500 ${
            isScrolled
              ? "transform -translate-y-0 bg-opacity-95 text-white"
              : "transform translate-y-0 bg-transparent"
          }`}
          role="banner"
        >
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            {/* Navigation */}
            <nav
              className="flex md:flex-row bg-white p-5 rounded space-x-6"
              aria-label="Primary Navigation"
            >
              {["About", "Projects", "Contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-xl font-semibold transition-transform duration-300 transform hover:scale-105 ${
                    activeSection === section
                      ? "text-blue-900 border-b-2 border-white"
                      : "hover:text-blue-500 text-black"
                  }`}
                  aria-current={activeSection === section ? "page" : undefined}
                >
                  {section}
                </button>
              ))}
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-28 container mx-auto px-6">
          <AnimatePresence mode="wait">{renderSection()}</AnimatePresence>
        </main>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-6 right-6"
            >
              <button
                onClick={scrollToTop}
                className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
                aria-label="Scroll to Top"
              >
                <FaArrowUp />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Buttons */}
        <nav
          className="fixed bottom-0 left-0 right-0 bg-white z-50 shadow-t-md md:hidden dark:bg-gray-950 dark:text-white"
          aria-label="Mobile Navigation"
        >
          <div className="flex justify-around py-4">
            {["About", "Projects", "Contact"].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`flex flex-col items-center text-sm font-medium transition-transform duration-300 transform hover:scale-110 ${
                  activeSection === section
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600 dark:text-white"
                }`}
                aria-current={activeSection === section ? "page" : undefined}
              >
                {/* Replace with appropriate icons */}
                {section === "About" && <FaEnvelope size={20} />}
                {section === "Projects" && <FaGithub size={20} />}
                {section === "Contact" && <FaLinkedin size={20} />}
                <span>{section}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default About;