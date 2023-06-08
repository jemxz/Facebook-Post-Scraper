const $ = require("jquery");

module.exports = async function getText(divSelector, page) {
  const text = [];
  try {
    let timeOfPost_selector = divSelector;

    let timeOfPosts = await page.evaluate((sel) => {
      let elements = Array.from(document.querySelectorAll(sel));
      return elements.length;
    }, timeOfPost_selector);

    for (let i = 0; i < timeOfPosts; i++) {
      var content = await page.evaluate(
        (l, sel) => {
          let elements = Array.from(document.querySelectorAll(sel));
          let anchor = elements[l];
          if (anchor) {
            return anchor.innerText;
          } else {
            return "empty";
          }
        },
        i,
        timeOfPost_selector
      );
      text.push(content);
    }
  } catch (error) {
    console.log(error);
  }

  return text;
};
