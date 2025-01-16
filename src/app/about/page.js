// components/About.js

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Head from "next/head";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
  FaTwitter,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaProjectDiagram,
  FaAddressBook,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import siteMetadata from "@/utils/siteMetadata";

const myBlog = "/images/";

const About = () => {
  const [activeSection, setActiveSection] = useState("About");
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const projectsContainerRef = useRef(null);

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

  // Projects data
  const projects = [
    {
      name: "Houseme",
      description: "A real estate website.",
      url: "https://houseme.ng",
      image: `${myBlog}project1.png`,
    },
    {
      name: "Unicorn Contractors",
      description: "A building management website.",
      url: "https://unicorncontractors.com.ng",
      image: `${myBlog}project2.png`,
    },
    {
      name: "My blog",
      description: "A new way to write.",
      url: "https://github.com/dumb0ctopus/my-blog",
      image: `${myBlog}project3.png`,
    },
    {
      name: "A Search Tool",
      description: "I'm using a tweaked version for my blog.",
      url: "https://github.com/dumb0ctopus/searchTool",
      image: `${myBlog}project4.png`,
    },
    {
      name: "Epub Reader",
      description: "In progress. I'll continue to update the repo.",
      url: "https://github.com/dumb0ctopus/epubReader",
      image: `${myBlog}project5.png`,
    },
  ];

  // Handle project container scroll
  useEffect(() => {
    const container = projectsContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const totalScrollWidth = container.scrollWidth - containerWidth;
      const index = Math.round(
        (scrollLeft / totalScrollWidth) * (projects.length - 1)
      );
      setCurrentProjectIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [projects.length]);

  // Scroll to a specific project
  const scrollToProject = (index) => {
    const container = projectsContainerRef.current;
    if (!container) return;

    const projectCardWidth = container.offsetWidth * 0.8; // Adjust based on your card width
    container.scrollTo({
      left: projectCardWidth * index,
      behavior: "smooth",
    });
    setCurrentProjectIndex(index);
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
            className="flex flex-col lg:flex-row items-center justify-center text-center md:text-left space-y-8 lg:space-y-0 md:space-x-16 py-16 md:py-32 dark:bg-gray-950 dark:text-white"
            aria-labelledby="about-heading"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full md:w-1/2 max-w-md"
            >
              <Image
                src="/images/myImg.jpg"
                alt="Jesuloluwa's Profile Picture"
                width={400}
                height={400}
                className="rounded-lg shadow-xl transform hover:rotate-3 transition-all duration-500"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="lg:w-1/2 max-w-2xl px-5"
            >
              <h1
                id="about-heading"
                className="sm:text-6xl text-3xl font-extrabold mb-6 text-gray-900 leading-tight dark:bg-gray-950 dark:text-white"
              >
                <span className="block">Hello,</span> I&#39;m
                <span className="text-blue-600 mx-3">Jesuloluwa</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed dark:bg-gray-950 dark:text-white">
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
            className="relative py-20 dark:bg-gray-950 dark:text-white overflow-x-hidden"
            aria-labelledby="projects-heading"
          >
            <h2
              id="projects-heading"
              className="text-5xl font-bold text-center text-gray-900 mb-12 dark:bg-gray-950 dark:text-white"
            >
              Projects
            </h2>

            {/* Projects Container */}
            <div className="relative">
              {/* Left Arrow */}
              {currentProjectIndex > 0 && (
                <button
                  onClick={() => scrollToProject(currentProjectIndex - 1)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg z-10"
                  aria-label="Previous Project"
                >
                  <FaChevronLeft size={24} />
                </button>
              )}

              {/* Projects Cards */}
              <div
                ref={projectsContainerRef}
                className="flex space-x-8 overflow-x-scroll scrollbar-hidden py-6 snap-x snap-mandatory dark:bg-gray-950 dark:text-white"
              >
                {projects.map((project, index) => (
                  <motion.article
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-xl snap-center py-5 px-3 min-w-[90%] sm:min-w-[300px] transform transition-transform duration-300 hover:scale-105 dark:bg-gray-600 dark:text-white"
                    aria-labelledby={`project-${index}-title`}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.name} Screenshot`}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3
                      id={`project-${index}-title`}
                      className="text-2xl font-bold text-gray-800 mb-2 dark:text-white"
                    >
                      {project.name}
                    </h3>
                    <p className="sm:text-lg text-sm text-gray-600 mb-4 dark:text-white">
                      {project.description}
                    </p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Visit
                    </a>
                  </motion.article>
                ))}
              </div>

              {/* Right Arrow */}
              {currentProjectIndex < projects.length - 1 && (
                <button
                  onClick={() => scrollToProject(currentProjectIndex + 1)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg z-10"
                  aria-label="Next Project"
                >
                  <FaChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToProject(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentProjectIndex === index
                      ? "bg-blue-600"
                      : "bg-gray-400 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                ></button>
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
        <meta
          property="og:image"
          content={`${siteMetadata.siteUrl}/images/og-image.png`}
        />
        <meta property="og:url" content="https://jesuloluwa.com/about" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jesuloluwa's Portfolio" />
        <meta
          name="twitter:description"
          content="Developer, Blogger, and Open Source Contributor. Explore my projects and blog."
        />
        <meta
          name="twitter:image"
          content={`${siteMetadata.siteUrl}/images/twitter-image.png`}
        />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jesuloluwa",
              jobTitle: "Web Developer",
              url: "https://jesuloluwa.com/about",
              sameAs: [
                siteMetadata.github,
                siteMetadata.linkedin,
                siteMetadata.twitter,
              ],
              image: `${siteMetadata.siteUrl}/images/profileImg.png`,
              description:
                "I'm a developer dedicated to crafting creative, dynamic web experiences. Explore my projects and blog.",
            }),
          }}
        />
      </Head>

      <div className="bg-white transition-colors duration-500 dark:bg-gray-950 dark:text-white">
        {/* Sticky Header */}
        <header
          className={`fixed hidden md:flex top-0 left-0 right-0 z-50 transition-transform duration-500 ${
            isScrolled
              ? "bg-opacity-95 text-white shadow-lg bg-white dark:bg-gray-950"
              : "bg-transparent"
          }`}
          role="banner"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center mt-20">
            {/* Navigation */}
            <nav
              className="flex space-x-6 p-5 rounded"
              aria-label="Primary Navigation"
            >
              {["About", "Projects", "Contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-xl font-semibold transition-transform duration-300 transform hover:scale-105 ${
                    activeSection === section
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "hover:text-blue-500 text-black dark:text-white"
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
        <main className="pt-28 max-w-7xl mx-auto px-6">
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
          className="fixed bottom-0 left-0 right-0 bg-white z-50 shadow-t-md md:hidden dark:bg-gray-950 dark:text-white overflow-x-hidden"
          aria-label="Mobile Navigation"
        >
          <div className="flex justify-around py-4">
            {[
              { name: "About", icon: <FaUser size={20} /> },
              { name: "Projects", icon: <FaProjectDiagram size={20} /> },
              { name: "Contact", icon: <FaAddressBook size={20} /> },
            ].map((section) => (
              <button
                key={section.name}
                onClick={() => setActiveSection(section.name)}
                className={`flex flex-col items-center text-sm font-medium transition-transform duration-300 transform hover:scale-110 ${
                  activeSection === section.name
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600 dark:text-white"
                }`}
                aria-current={
                  activeSection === section.name ? "page" : undefined
                }
              >
                {section.icon}
                <span>{section.name}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default About;
