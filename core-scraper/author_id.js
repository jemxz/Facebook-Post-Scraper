const getAuthroLinks = require("../common/author-scraper");

module.exports = async function getAuthorId(page, divSelector) {
  const result = [];
  const authorLinks = await getAuthroLinks(page, divSelector);
  for (let i = 0; i < authorLinks.length; i++) {
    var tempIndex = authorLinks[i].indexOf("?groupid");
    var tempIndexForNewString = authorLinks[i].indexOf("&groupid=");
    var tempIndexOfFacebookLink = authorLinks[i].indexOf("facebook.com/");
    if (authorLinks[i].slice(0, tempIndex).length > 300) {
      result.push({
        authorUrl: authorLinks[i]
          .slice(0, tempIndexForNewString)
          .replace("//m", "//www"),
        authorId: authorLinks[i].slice(
          tempIndexOfFacebookLink + 28,
          tempIndexForNewString
        ),
      });
    } else {
      result.push({
        authorUrl: authorLinks[i].slice(0, tempIndex).replace("//m", "//www"),
        authorId: authorLinks[i].slice(tempIndexOfFacebookLink + 13, tempIndex),
      });
    }
  }
  console.log("authorId and authorUrl: " + result.length);
  return result;

  // console.log(result);
};
