const log = require("log-to-file");

module.exports = async function getImage(divSelector, page) {
  try {
    let div_selector = divSelector;
    var imageLinks = [];
    imageLinks = await page.evaluate(() => {
      const elements = document.querySelectorAll(".img._1-yc.profpic"); // Replace with the class selector for the image tags
      const links = [];

      for (let i = 1; i < elements.length - 1; i++) {
        const element = elements[i];
        if (element) {
          const imageLink = element.style.backgroundImage
            .replace('url("', "")
            .replace('")', "")
            .replace(/\\3a /g, ":")
            .replace(/\\26 /g, "&")
            .replace(/\\3d /g, "=")
            .replace(/\\'/g, "'");
          links.push(imageLink);
        }
      }

      return links;
    });

    return imageLinks;
  } catch (error) {
    log(error, "../log/error.log");
    return console.log(error);
  }
};
