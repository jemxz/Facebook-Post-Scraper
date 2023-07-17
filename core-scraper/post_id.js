const linkScraper = require("../common/link-scraper");

module.exports = async function getPostIds(page, selector) {
  const result = [];
  const postsIds = await linkScraper(page, selector);
  console.log(postsIds);
  for (let i = 0; i < postsIds.length; i++) {
    if (postsIds[i].includes("story.php?story_fbid")) {
      var tempIndexOfEnd = postsIds[i].indexOf("&eav=");
      var tempIndexOfId = postsIds[i].indexOf("story_fbid=");
      var tempIndexOfStoryId = postsIds[i].indexOf("&id=");
      result.push({
        postUrl: postsIds[i].slice(0, tempIndexOfEnd).replace("//m", "//www"),
        postId: postsIds[i].slice(tempIndexOfId + 11, tempIndexOfStoryId),
      });
    } else {
      var tempIndex = postsIds[i].indexOf("/?m_entstream_source");
      var tempIndexOfPermaLink = postsIds[i].indexOf("/permalink/");
      result.push({
        postUrl: postsIds[i].slice(0, tempIndex).replace("//m", "//www"),
        postId: postsIds[i].slice(tempIndexOfPermaLink + 11, tempIndex),
      });
    }
  }
  console.log("postId and URL: " + result.length);
  console.log(result);
  return result;
};
