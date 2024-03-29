const $ = require("jquery");

module.exports = async function getText(divSelector, page) {
  const text = [];
  try {
    let post_selector = divSelector;

    var parentDiv = "._3q6s._78cw";

    let post_length = await page.evaluate((sel) => {
      let elements = Array.from(document.querySelectorAll(sel));
      return elements.length;
    }, post_selector);
    for (let i = 0; i < post_length; i++) {
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
        post_selector
      );
      text.push(content);
    }
  } catch (error) {
    console.log(error);
  }

  return text;
};
