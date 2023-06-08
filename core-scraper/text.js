const textScraper = require("../common/text-scraper");

module.exports = async function getPostIds(page, selector) {
  const texts = await textScraper(page, selector);
  const cleanedStrings = texts.map((str) => str.replace(/\n|\+/g, ""));
  console.log("postText: " + cleanedStrings.length);
  return cleanedStrings;
};
