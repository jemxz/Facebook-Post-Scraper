const imgScraper = require("../common/img-scraper");

module.exports = async function getImages(page, selector) {
  const authorImages = await imgScraper(page, selector);
  console.log(authorImages);
};
