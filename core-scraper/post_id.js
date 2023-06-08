const linkScraper = require("../common/link-scraper");

module.exports = async function getPostIds(page, selector) {
  const result = [];
  const postsIds = await linkScraper(page, selector);
  for (let i = 0; i < postsIds.length; i++) {
    var tempIndex = postsIds[i].indexOf("/?m_entstream_source");
    var tempIndexOfPermaLink = postsIds[i].indexOf("/permalink/");
    result.push({
      postUrl: postsIds[i].slice(0, tempIndex).replace("//m", "//www"),
      postId: postsIds[i].slice(tempIndexOfPermaLink + 11, tempIndex),
    });
  }
  console.log("postId and URL: " + result.length);
  return result;
};
