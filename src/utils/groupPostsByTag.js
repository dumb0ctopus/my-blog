// src/utils/groupPostsByTag.js
import getPostMetadata from "./getPostMetadata";

export default function groupPostsByTag() {
  const posts = getPostMetadata();
  const groupedByTag = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!groupedByTag[tag]) {
        groupedByTag[tag] = [];
      }
      groupedByTag[tag].push(post);
    });
  });

  return groupedByTag;
}
