// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.jesuloluwa.com",
  generateRobotsTxt: true, // Enable robots.txt generation
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Add more policies if needed
    ],
    additionalSitemaps: ["https://www.jesuloluwa.com/sitemap.xml"], // Path to your sitemap
  },
};
