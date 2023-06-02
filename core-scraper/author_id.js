const getAuthroLinks = require("../common/author-scraper");

module.exports = async function getAuthorId(page, divSelector) {
  const result = [];
  const authorLinks = await getAuthroLinks(page, divSelector);
  for (let i = 0; i < authorLinks.length; i++) {
    var tempIndex = authorLinks[i].indexOf("?groupid");
    var tempIndexOfFacebookLink = authorLinks[i].indexOf("facebook.com/");
    result.push({
      authorId: authorLinks[i].slice(0, tempIndex).replace("//m", "//www"),
      authorUrl: authorLinks[i].slice(tempIndexOfFacebookLink + 13, tempIndex),
    });
  }

  // console.log(result);
};
