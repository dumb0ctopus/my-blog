/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.jesuloluwa.com",
  generateRobotsTxt: true, // Enable robots.txt generation
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*", // All user agents
        allow: "/", // Allow all pages
      },
    ],
  },
};
