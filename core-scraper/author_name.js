const nameScraper = require("../common/name-scraper");

module.exports = async function getAuthorName(page, divSelector) {
  const authorNames = await nameScraper(page, divSelector);
  // console.log(authorNames);
  return authorNames;
};
